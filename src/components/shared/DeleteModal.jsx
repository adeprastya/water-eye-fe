import { Button, Modal } from "flowbite-react";

export default function DeleteModal({ data, openModal, setOpenModal, handleFn }) {
	return (
		<Modal onClick={(e) => e.stopPropagation()} show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
			<Modal.Header />
			<Modal.Body>
				<div className="text-center">
					<h3 className="mb-5 text-lg font-normal">
						Are you sure you want to delete <span className="font-bold tracking-wide">{data}</span>?
					</h3>

					<div className="flex justify-center gap-4">
						<Button color="failure" onClick={() => handleFn()}>
							Yes, Im sure
						</Button>

						<Button color="gray" onClick={() => setOpenModal(false)}>
							No, cancel
						</Button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
}
