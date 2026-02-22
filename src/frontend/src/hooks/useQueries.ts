import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Product, Banner, Inquiry, InquiryStatus, ProductInput, UserProfile } from '../backend';
import { ExternalBlob } from '../backend';
import { toast } from 'sonner';

// Product Queries
export function useGetAllProducts() {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetProductsByCategory(category: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['products', category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProductsByCategory(category);
    },
    enabled: !!actor && !isFetching && !!category,
  });
}

export function useAddProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product: ProductInput) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addProduct(product);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Product added successfully');
    },
    onError: (error) => {
      toast.error('Failed to add product');
      console.error(error);
    },
  });
}

export function useUpdateProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, product }: { productId: string; product: ProductInput }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateProduct(productId, product);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update product');
      console.error(error);
    },
  });
}

export function useDeleteProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteProduct(productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Product deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete product');
      console.error(error);
    },
  });
}

// Category Queries
export function useGetCategories() {
  const { actor, isFetching } = useActor();

  return useQuery<string[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCategories();
    },
    enabled: !!actor && !isFetching,
  });
}

// Banner Queries
export function useGetAllBanners() {
  const { actor, isFetching } = useActor();

  return useQuery<Banner[]>({
    queryKey: ['banners'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBanners();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddBanner() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ image, link }: { image: ExternalBlob; link: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addBanner(image, link);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] });
      toast.success('Banner added successfully');
    },
    onError: (error) => {
      toast.error('Failed to add banner');
      console.error(error);
    },
  });
}

export function useUpdateBanner() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ bannerId, image, link }: { bannerId: string; image: ExternalBlob; link: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateBanner(bannerId, image, link);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] });
      toast.success('Banner updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update banner');
      console.error(error);
    },
  });
}

export function useDeleteBanner() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bannerId: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteBanner(bannerId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] });
      toast.success('Banner deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete banner');
      console.error(error);
    },
  });
}

// Inquiry Queries
export function useGetAllInquiries() {
  const { actor, isFetching } = useActor();

  return useQuery<Inquiry[]>({
    queryKey: ['inquiries'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllInquiries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddInquiry() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({ name, phone, message }: { name: string; phone: string; message: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addInquiry(name, phone, message);
    },
    onSuccess: () => {
      toast.success('Inquiry submitted successfully! We will contact you soon.');
    },
    onError: (error) => {
      toast.error('Failed to submit inquiry');
      console.error(error);
    },
  });
}

export function useUpdateInquiryStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ inquiryId, status }: { inquiryId: string; status: InquiryStatus }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateInquiryStatus(inquiryId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
      toast.success('Inquiry status updated');
    },
    onError: (error) => {
      toast.error('Failed to update inquiry status');
      console.error(error);
    },
  });
}

export function useDeleteInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (inquiryId: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteInquiry(inquiryId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
      toast.success('Inquiry deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete inquiry');
      console.error(error);
    },
  });
}

// User Profile Queries
export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}
