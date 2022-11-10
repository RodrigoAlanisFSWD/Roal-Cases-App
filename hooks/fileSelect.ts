import { useState } from "react"

export const useFileSelect = () => {
    const [file, setFile] = useState(null)
    const [fileError, setFileError] = useState(false)
    const [fileSuccess, setFileSuccess] = useState(false)

    return {
        file,
        setFile,
        fileError,
        setFileError,
        fileSuccess,
        setFileSuccess
    }
}