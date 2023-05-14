export const useImage = (imageUrl: string) => {
    return `${process.env.NEXT_PUBLIC_SERVER_URL}${imageUrl}`
}