import { Loader } from "lucide-react"
import { Button, ButtonProps } from "./button"

type LoadingButtonProps = {
  loading: boolean
} & ButtonProps

const LoadingButton = ({
  children, loading, ...props
}: LoadingButtonProps) => {

  return (
    <Button {...props} disabled={props.disabled || loading}>
      {loading && <Loader className="mr-2 h-4 w-4 animate-spin"/>}
      {children}
    </Button>
  )
}

export default LoadingButton
