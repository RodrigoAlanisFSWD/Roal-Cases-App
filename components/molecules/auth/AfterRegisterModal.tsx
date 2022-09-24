import { Button } from "../../atoms/shared/Button";
import { useRouter } from "next/router";

export const AfterRegister = () => {

    const router = useRouter()

    return (
        <div className="top-0 fixed w-screen h-screen bg-modal z-50 flex justify-center items-center">
            <div className="w-11/12 max-w-lg min-h-[100px] bg-white rounded-md p-[10px] grid grid-cols-1 grid-rows-[30px_1fr] items-center">
                <div className="flex flex-row-reverse justify-end">
                    <h2 className="text-2xl">
                        Gracias Por Registrarte!
                    </h2>
                </div>
                <div className="pt-6 flex flex-cl items-center h-full text-xl">
                    Ahora Te Pedimos Completes La Verificacion De Correo Electronico.
                     A Tu Correo Llego Un Codigo Que Debes Ingresar, Cuando Estes Listo Da Click En Continuar

                    <Button text="Continuar" onClick={() => {
                        router.push("/verify_email")
                    }} className="mt-6" />
                </div>
            </div>
        </div>
    )
}