package com.shopping.service;

import com.shopping.model.Product;
import com.shopping.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {

    @InjectMocks
    private ProductService productService;

    @Mock
    private ProductRepository productRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindAll() {
        Product product1 = new Product(1L, "Product 1", "Description 1", 10.0,LocalDateTime.now(), LocalDateTime.now());
        Product product2 = new Product(2L, "Product 2", "Description 2", 20.0,LocalDateTime.now(), LocalDateTime.now());
        List<Product> products = Arrays.asList(product1, product2);

        when(productRepository.findAll()).thenReturn(products);

        List<Product> result = productService.findAll();
        assertThat(result).hasSize(2);
        assertThat(result).contains(product1, product2);

        verify(productRepository, times(1)).findAll();
    }

    @Test
    public void testFindById() {
        Product product = new Product(1L, "Product 1", "Description 1", 10.0,LocalDateTime.now(), LocalDateTime.now());
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        Product result = productService.findById(1L);
        assertThat(result).isNotNull();
        assertThat(result.getName()).isEqualTo("Product 1");

        verify(productRepository, times(1)).findById(1L);
    }

    @Test
    public void testSave() {
        Product product = new Product(1L, "Product 1", "Description 1", 10.0,LocalDateTime.now(), LocalDateTime.now());
        when(productRepository.save(any(Product.class))).thenReturn(product);

        Product result = productService.save(product);
        assertThat(result).isNotNull();
        assertThat(result.getName()).isEqualTo("Product 1");

        verify(productRepository, times(1)).save(product);
    }

    @Test
    public void testDeleteById() {
        doNothing().when(productRepository).deleteById(1L);

        productService.deleteById(1L);

        verify(productRepository, times(1)).deleteById(1L);
    }
}
