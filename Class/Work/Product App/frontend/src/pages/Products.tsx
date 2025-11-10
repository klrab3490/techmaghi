import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

export default function Products() {
    const { products, fetchProducts, fetchProductData } = useUser();
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            await fetchProducts();
            setLoading(false);
        };
        load();
    }, []);

    const handleViewDetails = async (id: string) => {
        const data = await fetchProductData(id);
        setSelectedProduct(data);
    };

    const filteredProducts = products.filter((p) =>
        p.name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-semibold mb-6">🛍️ Products</h1>

                {/* Search */}
                <div className="mb-6">
                    <Input
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-sm"
                    />
                </div>

                {/* Product List */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <Skeleton key={i} className="h-48 rounded-xl" />
                        ))}
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <p className="text-gray-500 text-center">No products found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => (
                            <Card
                                key={product._id || product.id}
                                className="hover:shadow-md transition-shadow"
                            >
                                <CardHeader>
                                    <CardTitle>{product.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                        {product.description?.slice(0, 80) || "No description available."}
                                    </p>
                                    <p className="font-semibold mb-4">₹{product.price}</p>
                                    <Button
                                        variant="outline"
                                        onClick={() => handleViewDetails(product._id || product.id)}
                                    >
                                        View Details
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Product Details Modal */}
                {selectedProduct && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <Card className="max-w-md w-full">
                            <CardHeader>
                                <CardTitle>{selectedProduct.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 dark:text-gray-300 mb-2">
                                    {selectedProduct.description}
                                </p>
                                <p className="font-semibold mb-3">Price: ₹{selectedProduct.price}</p>
                                <Button variant="default" onClick={() => setSelectedProduct(null)}>
                                    Close
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}
