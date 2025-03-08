export class Fashion {
    constructor(
        public _id: any = null,   
        public fashion_subject: string = "",
        public style: string = "",
        public fashion_detail: string = "",  
        public fashion_image: string = "",
        public created_at: Date = new Date() 
    ) {}
}
