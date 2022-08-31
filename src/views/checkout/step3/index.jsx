import { CHECKOUT_STEP_1 } from 'constants/routes';
import { Form, Formik } from 'formik';
import { displayActionMessage } from 'helpers/utils';
import { useDocumentTitle, useScrollTop } from 'hooks';
import PropType from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { StepTracker } from '../components';
import withCheckout from '../hoc/withCheckout';
import CreditPayment from './CreditPayment';
import PayPalPayment from './PayPalPayment';
import PaytmPayment from './PaytmPayment';
import Total from './Total';
// Add Gpay
import GooglePayButton from '@google-pay/button-react'

const FormSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, 'Name should be at least 4 characters.')
    .required('Name is required'),
  cardnumber: Yup.string()
    .min(13, 'Card number should be 13-19 digits long')
    .max(19, 'Card number should only be 13-19 digits long')
    .required('Card number is required.'),
  expiry: Yup.date()
    .required('Credit card expiry is required.'),
  ccv: Yup.string()
    .min(3, 'CCV length should be 3-4 digit')
    .max(4, 'CCV length should only be 3-4 digit')
    .required('CCV is required.'),
  type: Yup.string().required('Please select paymend mode')
});

const Payment = ({ shipping, payment, subtotal }) => {
  useDocumentTitle('Check Out Final Step | Salinaka');
  useScrollTop();

  const initFormikValues = {
    name: payment.name || '',
    cardnumber: payment.cardnumber || '',
    expiry: payment.expiry || '',
    ccv: payment.ccv || '',
    type: payment.type || 'paypal'
  };

  const onConfirm = () => {
    // Payment Add in Card...
    displayActionMessage('Feature not ready yet :)', 'info');
    console.log('Feature not ready yet :)', 'Card');
  };

  if (!shipping || !shipping.isDone) {
    return <Redirect to={CHECKOUT_STEP_1} />;
  }
  return (
    <div className="checkout">
      <StepTracker current={3} />
      <Formik
        initialValues={initFormikValues}
        validateOnChange
        validationSchema={FormSchema}
        validate={(form) => {
          if (form.type === 'paypal') {
            // Payment Add in Paypal and PayPal...
            displayActionMessage('Feature not ready yet :)', 'info');
            console.log('Feature not ready yet :)', 'PayPal');
          } 
          if (form.type === 'paytm') {
            // Payment Add in Paypal and Paytm...
            displayActionMessage('Feature not ready yet :)', 'info');
            console.log('Feature not ready yet :)', 'Paytm');
          }
          
        }}
        onSubmit={onConfirm}
      >
        {() => (
          <Form className="checkout-step-3">
            {/* <CreditPayment /> */}
            {/* <PayPalPayment /> */}
            <PaytmPayment />
            <br />
            <GooglePayButton
              environment="TEST"
              paymentRequest={{
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods: [
                  {
                    type: 'CARD',
                    parameters: {
                      allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                      allowedCardNetworks: ['MASTERCARD', 'VISA'],
                    },
                    tokenizationSpecification: {
                      type: 'PAYMENT_GATEWAY',
                      parameters: {
                        gateway: 'example',
                        gatewayMerchantId: 'exampleGatewayMerchantId',
                      },
                    },
                  },
                ],
                merchantInfo: {
                  merchantId: '12345678901234567890',
                  merchantName: 'Demo Merchant',
                },
                transactionInfo: {
                  totalPriceStatus: 'FINAL',
                  totalPriceLabel: 'Total',
                  totalPrice: '100.00',
                  currencyCode: 'INR',
                  countryCode: 'IN',
                },
              }}
              onLoadPaymentData={paymentRequest => {
                console.log('load payment data', paymentRequest);
              }}
            />
            <Total
              isInternational={shipping.isInternational}
              subtotal={subtotal}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

Payment.propTypes = {
  shipping: PropType.shape({
    isDone: PropType.bool,
    isInternational: PropType.bool
  }).isRequired,
  payment: PropType.shape({
    name: PropType.string,
    cardnumber: PropType.string,
    expiry: PropType.string,
    ccv: PropType.string,
    type: PropType.string
  }).isRequired,
  subtotal: PropType.number.isRequired
};

export default withCheckout(Payment);
