import bcrypt from 'bcrypt';

export const hashPasword = async(password) => {
    try {
        const saltRound = 10;
        const hashPasword = await bcrypt.hash(password, saltRound);
        return hashPasword;
    } catch (error) {
        console.log(error)
    }
}

export const comparePassword = async (password, hashPasword) => {
    return bcrypt.compare(password, hashPasword);
}