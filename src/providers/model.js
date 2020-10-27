import axiosProvider from './config/axios'

export async function makeInference(object) {
    try {
       
        object.viewTarget = (object.viewTarget).replaceAll(".", "")
        object.viewTarget = parseInt(object.viewTarget)
        object.budget = ((object.budget).replaceAll("R$", "")).replaceAll(" ", "")
        object.budget = (object.budget).replaceAll(".", "")
        object.budget = parseFloat(object.budget)

        let requestResponse = await axiosProvider.post('/model/inference/', object)

        return requestResponse.data

    } catch (error) {
        throw (error)
    }
}


export async function makeSugestion(object) {
    try {
        let requestResponse = await axiosProvider.post('/model/sugestion/', object)

        return requestResponse.data

    } catch (error) {
        throw (error)
    }
}

export async function renormalize(object) {
    try {
        let requestResponse = await axiosProvider.post('/model/inference/renormalize', object)

        return requestResponse.data

    } catch (error) {
        throw (error)
    }
}
