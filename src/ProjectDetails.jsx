// JsonDataPage.jsx
import React from 'react';
import './JsonDataPage.css'; // Import CSS file for styling
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const JsonDataPage = ({ data }) => {
    // Determine if the domain is present or not
    const domainPresent = data.check.result['simsrc.edu.in'];

    const handlePDFDownload = () => {
        const element = document.getElementById('container');
        const options = {
            scale: 1.0,
            scrollY: -window.scrollY,
            windowWidth: document.documentElement.offsetWidth,
            windowHeight: document.documentElement.scrollHeight,
        };

        html2canvas(element, options).then((canvas) => {
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210;
            const imgHeight = canvas.height * imgWidth / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save('json_data.pdf');
        });
    };

    const handleCSVDownload = () => {
        // Prepare data in CSV format (example data)
        const csvData = 'Name,Email\nJohn Doe,john@example.com\nJane Smith,jane@example.com';
    
        // Create a Blob object from the CSV data
        const blob = new Blob([csvData], { type: 'text/csv' });
    
        // Create a URL for the Blob object
        const url = window.URL.createObjectURL(blob);
    
        // Create an anchor element
        const link = document.createElement('a');
    
        // Set the href and download attributes
        link.href = url;
        link.download = 'data.csv';
    
        // Trigger a click event on the anchor element to initiate the download
        link.click();
    
        // Cleanup: Revoke the URL object to release the resources
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="container" id="container">
            <h1 className="heading">JSON DATA</h1>
            <div className="section">
                <h2 className="sub-heading">Links</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Text</th>
                            <th>Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.json_data.links.map((link, index) => (
                            <tr key={index}>
                                <td>{link.text}</td>
                                <td><a href={link.href} className="link">{link.href}</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="section">
                <h2 className="sub-heading">Pages</h2>
                <table className="table">
                    <tbody>
                        {Object.entries(data.json_data.pages).map(([key, value], index) => (
                            <tr key={index}>
                                <td>{key}</td>
                                <td>{value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="section">
                <h2 className="sub-heading">Certificates</h2>
                <p className="certificate">{data.certificates === '\"Not found\"' ? 'Not found' : 'Found'}</p>
            </div>
            <div className="section">
                <h2 className="sub-heading">Check</h2>
                <p className={`check ${domainPresent ? 'true' : 'false'}`}>
                    {domainPresent ? 'Domain Blocked' : 'Domain Not Blocked'}
                </p> 
            </div>
            
            <button className="download-button" onClick={handleCSVDownload}>Download as CSV</button>
        </div>
    );
};

export default JsonDataPage;
