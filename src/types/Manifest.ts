export interface ManifestInterface {
    id: string,
    title: string,
    description: string,
    manifestStatus: {
        type: string,
        message: string,
        period: string,
    },
    user: {
        id: string,
        userName: string
    },
    type: string,
    lastUpdate: string,
    protocol: {
        number: number,
        period: string
    }
}

export interface AttachmentFileInterface {
    ETag: string,
    ServerSideEncryption: string,
    Location: string,
    key: string,
    Key: string,
    Bucket:string
}

export interface ManifestRequest {
    id: string,
    title: string,
    description: string,
    manifestType: string,
    whoIsOpenManifest: string,
    entryChannel: string,
    patientFullName: string,
    cpf: string,
    dateBirth: string,
    state: string,
    city: string,
    gender: string,
    race: string,
    email: string,
    phoneType: string,
    phoneNumber: string,
    ownerName: string,
    typeCoagulopathy: string,
    severityCoagulopathy: string,
    locationTreatment: string,
    disabledPerson: string,
    typeOfDisability: string,
    manifestValue: string,
    manifestStatus: string,
    files: string,
    lastUpdate: string,
    userId: string,
    protocol: {
        value: number,
        period: string
    },
    response: {
        title: string,
        period: string,
        state: string,
        value: string,
        answeredAt: string,
        answeredBy: string
    }
}