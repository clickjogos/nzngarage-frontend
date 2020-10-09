import axiosProvider from './config/axios'


export async function makeInference(object) {
    try {
        object.budget = parseFloat(object.budget)
        object.viewTarget = parseInt(object.viewTarget)
        let requestResponse = await axiosProvider.post('/model/inference/', object)

        return requestResponse.data
        
    } catch (error) {
        throw ( error )
    }
}
