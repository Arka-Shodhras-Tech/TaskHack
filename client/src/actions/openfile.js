import axios from "axios";
export const OpenFile = async (filename) => {
    try {
        const url = `${process.env.REACT_APP_Server}/file/${filename}`;
        const response = await axios.get(url, { responseType: 'blob' });
        const fileType = response.data.type;
        console.log(fileType)
        if (fileType.startsWith('image/')) {
            const imageBlob = new Blob([response.data], { type: fileType });
            const imageUrl = URL.createObjectURL(imageBlob);
            return {url:imageUrl,type:"pdf"}
            // return imageUrl;
        }
        else if (fileType === 'image/svg+xml') {
            const reader = new FileReader();
            reader.onload = (e) => {
                return {url:e.target.result,type:"svg"}
                // setImageContent();
                // setFileUrl('');
                // setFileType('svg');
            };
            reader.readAsText(response.data);
        } else if (fileType === 'application/pdf') {
            const pdfBlob = new Blob([response.data], { type: fileType });
            const pdfUrl = URL.createObjectURL(pdfBlob);
            return {url:pdfUrl,type:"pdf"}
            // setFileUrl(pdfUrl);
            // setFileType('pdf');
            // setImageContent('');
        } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            const pdfBlob = new Blob([response.data], { type: fileType });
            const pdfUrl = URL.createObjectURL(pdfBlob);
            return {url:pdfUrl,type:"vnd.openxmlformats-officedocument.spreadsheetml.sheet"}
            // setFileUrl(pdfUrl);
            // setFileType('pdf');
            // setImageContent('');
        } 
        else {
            console.error('The file is not an image or PDF');
            // setError('The file is not an image or PDF');
        }
    } catch (e) {
        console.error(e);
        // setError('Error opening file');
    }
}