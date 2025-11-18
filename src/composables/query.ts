export function useQueryHandler<T>(){

    function paramToString(param: string | string[] | undefined): string {
        return Array.isArray(param) ? param[0] : param ?? ''
    }

    function formatQuery(str: string, toUrl = false): string{
        if(toUrl){
            return str.toLowerCase().replace(/\s+/g, "_")
        }
        else{
            return str.replace(/_/g, " ")
        }
    }

    return {
        paramToString,
        formatQuery
    }

}