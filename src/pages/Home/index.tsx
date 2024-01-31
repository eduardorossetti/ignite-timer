import { zodResolver } from '@hookform/resolvers/zod'
import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Countdown } from './components/Countdown'
import { NewCycleForm } from './components/NewCycleForm'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'

const newCycleFormSchema = z.object({
  task: z.string().min(1, 'Informe a tarefa!'),
  minutesAmount: z.number().min(1).max(60),
}) // define o tipo de dados que o formulário vai receber

type newCycleFormData = z.infer<typeof newCycleFormSchema> // infere os valores de newCycleFormSchema

export function Home() {
  const newCycleForm = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      minutesAmount: 1,
      task: '',
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  const task = watch('task') // monitora o campo task
  const isSubmitDisabled = !task

  const { createNewCycle, stopCurrentCycle, activeCycle } =
    useContext(CyclesContext)

  function handleCreateNewCycle(data: newCycleFormData) {
    createNewCycle(data)
    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={stopCurrentCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
