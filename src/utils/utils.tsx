import toast from 'react-hot-toast';

export const toastText = (message: string, type: string) => {
	switch (type) {
		case 'success':
			toast.success(message, {
				style: {
					fontSize: '16px',
				},
			});

			break;

		case 'error':
			toast.error(message, {
				style: {
					fontSize: '16px',
				},
			});
			break;
	}
};

export const formatPhoneNumber = (phoneNumber: string) => {
	// Remove all non-numeric characters from the input
	const cleanedNumber = phoneNumber.replace(/\D/g, '');

	// Define the phone number format (e.g., "(XXX) XXX-XXXX")
	const format = '($1) $2-$3';

	// Apply the mask to the cleaned number using a regular expression
	const maskedNumber = cleanedNumber.replace(/(\d{3})(\d{3})(\d{4})/, format);

	return maskedNumber;
};
