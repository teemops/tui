
var axios:any, token:string;

export const init=async function (axiosObject:any, jwtToken:string) {
    axios=axiosObject;
    token=jwtToken;
}

export const get=async function(path:string){
    try {
        if(token){
            const result=await axios.$get(`${path}`,{'headers': {
                'x-access-token': token
            }})
            if (result) {
                if(result.error!=undefined){
                    throw result.error;
                }else{
                    return true;
                }
            }else{
                throw 'Error getting user details'
            }
        }
    } catch (e) {
        throw e
    }
} 

export const post=async function(path:string, data:any){

}

export const put=async function(path:string, data:any){

}