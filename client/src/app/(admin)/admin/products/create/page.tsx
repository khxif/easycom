'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { productSchema, ProductSchemaType } from '@/zod-schemas/products';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft as ArrowLeftIcon } from 'lucide-react';
import { CldUploadButton } from 'next-cloudinary';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

export default function CreateProductPage() {
	const form = useForm<ProductSchemaType>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			name: '',
			price: '',
			category: '',
			description: '',
			image_url: '',
			stock: '',
		},
	});

	function onSubmit(values: ProductSchemaType) {
		console.log(values);
	}
	return (
		<main className="p-5 flex flex-col space-y-8 pb-24">
			<div className="flex flex-col space-y-5">
				<Link href="/admin/products" className="flex items-center space-x-2 text-sm">
					<ArrowLeftIcon size={16} />
					<p>Back</p>
				</Link>
				<h1 className="text-2xl font-semibold md:text-3xl">Add Products</h1>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Product Details</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-2">
							<div>
								<FormField
									control={form.control}
									name="image_url"
									render={({ field }) => (
										<FormItem className="flex space-x-4 items-center">
											<FormControl>
												<CldUploadButton
													uploadPreset="cw4upclb"
													options={{ maxFiles: 1 }}
													className="size-28 border flex items-center justify-center p-1 
                          rounded-full"
													onSuccess={data => {
														console.log(data);
                            form.setValue('image_url', data?.info?.url as string);
													}}

												>
													<Image
														width={50}
														height={50}
														src={field.value || '/assets/product-placeholder.png'}
														alt="placeholder"
														className="w-full h-full object-fill rounded-full"
													/>
												</CldUploadButton>
											</FormControl>
											<FormLabel>Product Image</FormLabel>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Product Name</FormLabel>
											<FormControl>
												<Input placeholder="shadcn" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="price"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Price</FormLabel>
											<FormControl>
												<Input placeholder="shadcn" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="category"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Category</FormLabel>
											<FormControl>
												<Input placeholder="shadcn" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="stock"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Stock</FormLabel>
											<FormControl>
												<Input placeholder="shadcn" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="description"
									render={({ field }) => (
										<FormItem className="col-span-2">
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Textarea rows={4} placeholder="shadcn" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<CardFooter className="flex justify-end space-x-4">
								<Link href="/admin/products">
									<Button type="submit" variant="ghost">
										Cancel
									</Button>
								</Link>
								<Button type="submit">Submit</Button>
							</CardFooter>
						</form>
					</Form>
				</CardContent>
			</Card>
		</main>
	);
}
