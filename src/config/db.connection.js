import {connect} from 'mongoose';

export const initMongoDB = async (URL_DB) => {
    try {
        await connect(URL_DB);
    } catch (error) {
        throw new Error(error)
    }
};