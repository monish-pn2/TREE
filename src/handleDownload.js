// handleDownload.js
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const handleDownload = () => {
    const element = document.getElementById('container');
    
    // Adjust html2canvas configuration
    const options = {
        scale: 1.0, // Increase scale to fit more content within the page
        scrollY: -window.scrollY, // Adjust for scrolling offset
        windowWidth: document.documentElement.offsetWidth, // Set the width of the window to capture
        windowHeight: document.documentElement.scrollHeight, // Set the height of the window to capture
    };

    html2canvas(element, options).then((canvas) => {
        const pdf = new jsPDF('p', 'mm', 'a4'); // Set PDF orientation and size
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210; // A4 width (in mm)
        const imgHeight = canvas.height * imgWidth / canvas.width; // Calculate height based on image aspect ratio

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('json_data.pdf');
    });
};

export default handleDownload;
