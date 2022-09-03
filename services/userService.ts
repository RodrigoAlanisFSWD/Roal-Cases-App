import {UserRepository} from "../repo/userRepository";

export const useUserService = () => {

    const userRepository = new UserRepository();

    const getProfile = async () => {
        return userRepository.getProfile()
    }

    return {
        getProfile
    }
}