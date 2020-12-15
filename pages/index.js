import { useState } from 'react'
import Head from 'next/head'

import { uploadImage } from '../services/uploadimage'
import { formDataFactory } from '../helpers/factories'
import { DEFAULT_IMAGE } from '../assets/defaultImage'

export default function Home() {
    const [image, setImage] = useState('')
    const [imageUrl, setImageUrl] = useState(DEFAULT_IMAGE)
    const [loading, setLoading] = useState(false)

    function handleOnChange(e) {
        setImage(e.target.files[0])
    }

    async function handleUploadImage() {
        setLoading(true)

        const formData = formDataFactory(image, 'reactupload')

        const response = await uploadImage(formData)

        const imgUrl = response.data.data.secure_url

        alert('Upload realizado com sucesso')
        setImage('')
        setImageUrl(imgUrl)
        setLoading(false)
        return
    }

    return (
        <div className="home">
            <Head>
                <title>Cloudinary Image Upload</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {loading ? (
                <h1>Carregando</h1>
            ) : (
                <>
                    <div>
                        <h1>Image input upload</h1>
                        <label id="thumbnail">
                            <input type="file" onChange={handleOnChange} />
                            {image ? (
                                <button onClick={handleUploadImage}>
                                    Enviar
                                </button>
                            ) : (
                                'Selecionar Imagem'
                            )}
                        </label>
                    </div>
                    <img src={imageUrl} />
                </>
            )}
        </div>
    )
}
