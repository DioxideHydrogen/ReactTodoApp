
interface FormProps {
	children: React.ReactNode;
	onSubmit: (data: { title: string; description: string }) => void;
}

function Form({ children, onSubmit }: FormProps) {
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const data = {
			title: formData.get('title') as string
		};
		onSubmit(data);
	};

	return (
		<form onSubmit={handleSubmit} className="mb-4">
			{children}
		</form>
	);
}

export default Form