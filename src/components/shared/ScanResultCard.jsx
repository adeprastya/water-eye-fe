import { Card, Badge } from "flowbite-react";

export default function ScanResultCard({ data }) {
	if (data.color.toLowerCase() == "Not Water".toLocaleLowerCase()) {
		return (
			<Card>
				<h5 className="text-4xl font-bold">Not Water</h5>

				<p>
					Confidence <span className="font-bold">{data.confidence}</span>
				</p>

				<p>Please insert an image of water or try to take picture more clearly</p>
			</Card>
		);
	}

	return (
		<Card>
			<h5 className="text-4xl font-bold">{data.color}</h5>

			<p>
				Confidence <span className="font-bold">{data.confidence}</span>
			</p>

			{/* Label */}
			<div className="flex flex-wrap gap-4 my-4">
				<Badge size="md" color={data.label.consume ? "success" : "failure"}>
					Consume
				</Badge>
				<Badge size="md" color={data.label.bath ? "success" : "failure"}>
					Bath
				</Badge>
				<Badge size="md" color={data.label.wash ? "success" : "failure"}>
					Wash
				</Badge>
				<Badge size="md" color={data.label.irrigation ? "success" : "failure"}>
					Irrigation
				</Badge>
			</div>

			{/* Result */}
			<div className="space-y-6">
				{/* Analysis */}
				<div>
					<p className="font-semibold">Analysis</p>
					<p className="leading-relaxed text-gray-600">{data.analysis}</p>
				</div>

				{/* Recommendation */}
				<div>
					<p className="font-semibold">Recommendation</p>
					<p className="leading-relaxed text-gray-600">{data.recommendation}</p>
				</div>

				{/* References */}
				<div>
					<p className="font-semibold">References</p>

					<div className="flex flex-col gap-2">
						{Array.isArray(data.reference) &&
							data.reference.map((ref, i) => (
								<a key={i} href={ref} className="text-primary-700 break-words leading-none">
									{ref}
								</a>
							))}
					</div>
				</div>
			</div>
		</Card>
	);
}
