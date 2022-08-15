import sgMail from '@sendgrid/mail';
import emailConfig from '../../config/email';

sgMail.setApiKey(emailConfig.sendgridKey);

export default sgMail;
