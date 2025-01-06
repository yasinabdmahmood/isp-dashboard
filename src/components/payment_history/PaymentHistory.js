import React from 'react';
import jsPDF from 'jspdf';
import ReceiptPrinter from '../receipt_printer/ReceiptPrinter';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {formatDate} from '../../helpers/formatDate';
import isAdmin from '../../helpers/isAdmin';
import Table from 'react-bootstrap/Table';
import { clearPaymentHistory, getPaymentHistory, deletePaymentRecord, filterPaymentHistory } from '../../redux/database/databaseReducer';
import trash from '../../assets/images/trash-fill.svg'
import isAdminPlus from '../../helpers/isAdminPlus';
import internetDish from '../../assets/images/powerbeam.png'
import janna from '../../assets/fonts/Janna.ttf'

function PaymentHistory() {
    const location = useLocation();
    const navigate = useNavigate();
    const subscriptionRecord = location.state?.subscriptionRecord;
    const dispatch = useDispatch();
    const paymentRecords = useSelector(state=>state.database?.paymentHistory);

    const handleDeletion = async (id) => {
      // Display alert message and prompt user to continue or cancel
      const confirmed = window.confirm('Are you sure you want to delete this item?');
      
      if (confirmed) {
        const payload = {id};
        await dispatch(deletePaymentRecord(payload));
        dispatch(filterPaymentHistory({id}))
      } else {
        // User clicked Cancel, do nothing
        return;
      }
    }

    useEffect(()=>{
        const fetchData = async() => {
            await dispatch(getPaymentHistory({id: subscriptionRecord.id}))
        }
        fetchData();
        return () => {
            dispatch(clearPaymentHistory());
        }
    },[subscriptionRecord.id]);

    const getUserName = () => {
        let loggedInEmployee = sessionStorage.getItem('user');
        let retrievedData = JSON.parse(loggedInEmployee);
        return retrievedData.name
    }

    const dawnloadRecipt = (subscriptionRecord)=>{
        const receiptParams = {
            employeeName: getUserName(),
            clientName: subscriptionRecord.client.name,
            pay: subscriptionRecord.pay,
            payDate: formatDate(subscriptionRecord.created_at),
        }
        generateReceipt(receiptParams)
    }

    function generateReceipt(parameters){
         const printText = (txt, x, y, doc, fs) =>{
            const kpt = doc.getTextDimensions(txt, { 'fontSize': fs });
            doc.text(txt, x - kpt.w, y + kpt.h);
        }
        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm", // Use millimeters for precision
            format: [80, 200], // Width: 80mm, Height: 297mm (A4 length, can be adjusted)
        });
        pdf.addFont(janna, 'Janna', 'normal');
        pdf.setFont('Janna');
    
        pdf.setFontSize(14); // Set font size suitable for POS receipts
        pdf.text('بابان نيت لخدمات الانترنيت', 16, 6)
    
        const img = new Image();
        img.src = internetDish;
        pdf.addImage(img, 'PNG', 62, 7, 20, 20);
    
        pdf.setFontSize(10);
        pdf.text('0770 359 88 00',29,15);
        pdf.text('0770 359 88 00',29,21);
        pdf.text('-------------------------------------------------------------',4,25);
    
        pdf.setFontSize(10);
        const fields = [
            `\u202B${parameters.employeeName}\u202C` + ` : ` +`اسم الموظف`,  
            `\u202B${parameters.clientName}\u202C` + ` : ` +'استلمت من السيد', 
            `\u202B${parameters.pay}\u202C IQD` + ` : ` +`مبلغ و قدره`,   
            `\u202B${parameters.payDate}\u202C` + ` : ` +`تاريخ تفعيل الشتراك`,    
            `\u202B${`${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, '0')}/${String(new Date().getDate()).padStart(2, '0')} ${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}`}\u202C` + ` : ` +`تاريخ دفع الشتراك`, 
        ]
        fields.forEach((field,index)=>{
            printText(field, 73, 30+7*index, pdf, 10)
        })
    
        pdf.text('-------------------------------------------------------------',4,70);
        
        pdf.setFontSize(10);
        printText('شورجة - قرب جسر شورجة - مقابل غسل كامران', 74, 73, pdf, 10)
        printText(': توقيع المستلم', 74, 80, pdf, 10)
    
        pdf.text('-------------------------------------------------------------',4,90);
    
        pdf.save('filename');
    }


    return (
        <div>
            <h1 className='text-start h4 m-4'>Subscription Payment history</h1>
            <div className="p-sm-3 mt-5">
            <textarea rows="5" className='w-100' readonly>{subscriptionRecord?.note || 'N/A'}</textarea>
            </div>
            <div className="p-sm-3 mt-5">
            <Table striped bordered hover responsive>
                <thead className="thead-dark" >
                <tr>
                    <th scope="col">User</th>
                    <th scope="col">Employee</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Date</th>
                    { (isAdmin() || isAdminPlus()) && <th scope="col">Action</th> }
                </tr>
                </thead>
                <tbody>
                {paymentRecords?.map(paymentRecord => (
                    <tr key={paymentRecord?.id}>
                    <td>{paymentRecord?.subscription_record.client.name}</td>
                    <td>{paymentRecord?.employee.name}</td>
                    <td>{paymentRecord?.amount}</td>
                    <td>{formatDate(paymentRecord?.created_at)}</td>
                    { (isAdmin() || isAdminPlus()) &&
                    <td className='d-flex justify-content-center'>
                      <img src={trash} alt='delete' style={{cursor: 'pointer'}}  onClick={()=>handleDeletion(paymentRecord?.id)} />
                    
                    </td>
                    }
                    </tr>
                ))}
                </tbody>
            </Table>
            </div>
            <button className='btn btn-sm btn-primary mx-5 my-2' onClick={()=>navigate('/receipt',{state: {subscriptionRecord}})} >Print Receipt</button>
            <button className='btn btn-sm btn-primary mx-5 my-2' onClick={()=>dawnloadRecipt(subscriptionRecord)} >Download Receipt</button>
        </div>
    );
}

export default PaymentHistory;