import { useState } from "react";

function LocationPicker({ locations, setLocations }) {
    const [zone, setZone] = useState("A");
    const [depth, setDepth] = useState(1);
    const [height, setHeight] = useState(1);
    const [quantity, setQuantity] = useState(0);

    const zones = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const depths = Array.from({ length: 13 }, (_, i) => i + 1);
    const heights = Array.from({ length: 6 }, (_, i) => i + 1);

    const addLocation = () => {
        if (quantity <= 0) {
            alert("Quantity must be greater than 0.");
            return;
        }

        const newLocation = {
            full_location: `${zone}${depth}H${height}`,
            zone,
            depth,
            height,
            quantity,
        };

        // التحقق من التكرار بناءً على Zone و Depth و Height
        if (
            locations.some(
                (loc) =>
                    loc.zone === newLocation.zone &&
                    loc.depth === newLocation.depth &&
                    loc.height === newLocation.height
            )
        ) {
            alert("This location already exists.");
            return;
        }

        setLocations([...locations, newLocation]);
        setQuantity(0);
    };

    const removeLocation = (index) => {
        setLocations(locations.filter((_, i) => i !== index));
    };

    return (
        <div>
            <div className="grid grid-cols-2 gap-4 mb-4">
                {/* اختيار Zone */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Zone:</label>
                    <select
                        value={zone}
                        onChange={(e) => setZone(e.target.value)}
                        className="block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                        {zones.map((z) => (
                            <option key={z} value={z}>
                                {z}
                            </option>
                        ))}
                    </select>
                </div>

                {/* اختيار Depth */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Depth:</label>
                    <select
                        value={depth}
                        onChange={(e) => setDepth(parseInt(e.target.value))}
                        className="block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                        {depths.map((d) => (
                            <option key={d} value={d}>
                                {d}
                            </option>
                        ))}
                    </select>
                </div>

                {/* اختيار Height */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Height:</label>
                    <select
                        value={height}
                        onChange={(e) => setHeight(parseInt(e.target.value))}
                        className="block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                        {heights.map((h) => (
                            <option key={h} value={h}>
                                {h}
                            </option>
                        ))}
                    </select>
                </div>

                {/* اختيار Quantity */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity:</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        placeholder="Enter quantity"
                        className="block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>

            {/* زر إضافة الموقع */}
            <button
                onClick={addLocation}
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:ring-4 focus:ring-green-300"
            >
                Add Location
            </button>

            {/* عرض المواقع المحددة */}
            <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Selected Locations:</h3>
                <ul className="space-y-2">
                    {locations.map((loc, index) => (
                        <li
                            key={index}
                            className="flex justify-between items-center p-2 bg-gray-100 rounded-lg shadow-sm"
                        >
                            <span>
                                {loc.full_location} - Quantity: {loc.quantity}
                            </span>
                            <button
                                onClick={() => removeLocation(index)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default LocationPicker;
