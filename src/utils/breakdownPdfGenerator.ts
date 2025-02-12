import { jsPDF } from 'jspdf';
import { BreakdownFormData } from '../types/breakdown';

export const generateBreakdownPDF = async (formData: BreakdownFormData): Promise<Blob> => {
  const doc = new jsPDF();
  const margin = 20;
  let y = margin;

  // Helper function to add text and increment y position
  const addText = (text: string, increment: number = 10) => {
    doc.text(text, margin, y);
    y += increment;
  };

  // Helper function to add a section header
  const addSectionHeader = (text: string) => {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    addText(text, 15);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
  };

  // Title and Reference
  doc.setFontSize(20);
  addText('Breakdown Visit Report', 15);
  doc.setFontSize(12);
  addText(`Reference: ${formData.reference}`, 15);
  addText(`Date: ${new Date(formData.date).toLocaleDateString()}`, 15);

  // Customer Details
  addSectionHeader('Customer Details');
  addText(`Name: ${formData.customer.name}`);
  addText(`Address: ${formData.customer.address}`);
  addText(`Contact: ${formData.customer.contactName}`);
  addText(`Phone: ${formData.customer.contactNumber}`);
  addText(`Email: ${formData.customer.email}`);
  addText(`PO Number: ${formData.customer.purchaseOrder}`, 15);

  // System Details
  addSectionHeader('System Details');
  addText(`Manufacturer: ${formData.system.manufacturer}`);
  addText(`Model: ${formData.system.model}`);
  addText(`Serial Number: ${formData.system.serialNumber}`);
  addText(`System Type: ${formData.system.systemType}`);
  addText(`Location: ${formData.system.location}`, 15);

  // Add new page if needed
  if (y > 250) {
    doc.addPage();
    y = margin;
  }

  // Fault Details
  addSectionHeader('Fault Details');
  addText(`Reported Fault: ${formData.fault.reportedFault}`);
  addText(`Category: ${formData.fault.faultCategory}`);
  addText(`Fault Found: ${formData.fault.faultFound}`);
  addText(`Root Cause: ${formData.fault.rootCause}`);
  addText(`Action Taken: ${formData.fault.actionTaken}`, 15);

  // Parts Used
  if (formData.fault.partsUsed.length > 0) {
    addSectionHeader('Parts Used');
    formData.fault.partsUsed.forEach(part => {
      addText(`${part.partNumber} - ${part.description} (Qty: ${part.quantity})`);
    });
    y += 5;
  }

  if (formData.fault.additionalPartsRequired) {
    addText(`Additional Parts Required: ${formData.fault.additionalPartsRequired}`, 15);
  }

  // Add new page
  doc.addPage();
  y = margin;

  // System Readings
  addSectionHeader('System Readings');
  addText(`Supply Temperature: ${formData.readings.supplyTemp}°C`);
  addText(`Return Temperature: ${formData.readings.returnTemp}°C`);
  addText(`Ambient Temperature: ${formData.readings.ambientTemp}°C`);
  addText(`Superheat: ${formData.readings.superheat}K`);
  addText(`Subcooling: ${formData.readings.subcooling}K`);
  addText(`Suction Pressure: ${formData.readings.suctionPressure} bar`);
  addText(`Discharge Pressure: ${formData.readings.dischargePressure} bar`, 15);

  if (formData.readings.refrigerantAdded) {
    addText('Refrigerant Added:');
    addText(`  Type: ${formData.readings.refrigerantAdded.type}`);
    addText(`  Amount: ${formData.readings.refrigerantAdded.amount}kg`);
    addText(`  Bottle Number: ${formData.readings.refrigerantAdded.bottleNumber}`, 15);
  }

  // Labor Details
  addSectionHeader('Labor Details');
  addText(`Arrival Time: ${new Date(formData.labor.arrivalTime).toLocaleString()}`);
  addText(`Departure Time: ${new Date(formData.labor.departureTime).toLocaleString()}`);
  addText(`Travel Time: ${formData.labor.travelTime} hours`);
  addText(`Number of Engineers: ${formData.labor.numberOfEngineers}`);
  addText(`Overtime Hours: ${formData.labor.overtimeHours}`, 15);

  // Recommendations & Follow-up
  addSectionHeader('Recommendations & Follow-up');
  addText(`Recommendations: ${formData.recommendations}`);
  if (formData.followUpRequired) {
    addText('Follow-up Required: Yes');
    addText(`Details: ${formData.followUpDetails}`, 15);
  } else {
    addText('Follow-up Required: No', 15);
  }

  // Add new page for photos
  if (formData.photos.length > 0) {
    doc.addPage();
    y = margin;
    addSectionHeader('Site Photos');
    
    const photoWidth = 80;
    const photoHeight = 60;
    let xPos = margin;
    
    for (let i = 0; i < formData.photos.length; i++) {
      if (xPos + photoWidth > doc.internal.pageSize.width - margin) {
        xPos = margin;
        y += photoHeight + 10;
      }
      
      if (y + photoHeight > doc.internal.pageSize.height - margin) {
        doc.addPage();
        y = margin;
      }

      try {
        doc.addImage(formData.photos[i], 'JPEG', xPos, y, photoWidth, photoHeight);
        xPos += photoWidth + 10;
      } catch (error) {
        console.error('Error adding photo to PDF:', error);
      }
    }
    
    y += photoHeight + 20;
  }

  // Add final page for signatures
  doc.addPage();
  y = margin;

  addSectionHeader('Completion');
  addText(`Engineer Name: ${formData.engineerName}`, 15);

  // Add signatures
  if (formData.engineerSignature) {
    addText('Engineer Signature:');
    doc.addImage(formData.engineerSignature, 'PNG', margin, y, 70, 30);
    y += 35;
  }

  if (formData.customerSignature) {
    addText('Customer Signature:');
    doc.addImage(formData.customerSignature, 'PNG', margin, y, 70, 30);
    y += 35;
  }

  // Add completion date
  if (formData.completedAt) {
    addText(`Completed: ${new Date(formData.completedAt).toLocaleString()}`, 15);
  }

  return doc.output('blob');
};