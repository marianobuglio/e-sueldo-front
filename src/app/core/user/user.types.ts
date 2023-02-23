export interface User
{
    _id: string;
    cargoFirma: string;
    id: string;
    name: string;
    email: string;
    avatar?: string;
    profileImageURL:string
    status?: string;
    empresas:Array<any>,
    empresa:String
    displayName:string
}
