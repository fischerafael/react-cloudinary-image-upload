export function formDataFactory(image, cloudinaryUploadPreset) {
    const formData = new FormData()
    formData.append('file', image)
    formData.append('upload_preset', cloudinaryUploadPreset)
    return formData
}
