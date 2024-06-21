package com.shopping.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.shopping.model.Product;
import com.shopping.service.ProductService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProductController.class)
public class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService productService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void getAllProductsTest() throws Exception {
        List<Product> products = Arrays.asList(
                new Product(1L, "Product 1", "Description 1", 10.0,LocalDateTime.now(), LocalDateTime.now()),
                new Product(2L, "Product 2", "Description 2", 20.0,LocalDateTime.now(), LocalDateTime.now())
        );

        Mockito.when(productService.findAll()).thenReturn(products);

        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Product 1"))
                .andExpect(jsonPath("$[1].name").value("Product 2"));
    }

    @Test
    public void getProductByIdTest() throws Exception {
        Product product = new Product(1L, "Product 1", "Description 1", 10.0,LocalDateTime.now(), LocalDateTime.now());

        Mockito.when(productService.findById(anyLong())).thenReturn(product);

        mockMvc.perform(get("/api/products/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Product 1"));
    }

    @Test
    public void createProductTest() throws Exception {
        Product product = new Product(1L, "Product 1", "Description 1", 10.0,LocalDateTime.now(), LocalDateTime.now());

        Mockito.when(productService.save(any(Product.class))).thenReturn(product);

        mockMvc.perform(post("/api/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(product)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Product 1"));
    }

    @Test
    public void updateProductTest() throws Exception {
        Product existingProduct = new Product(1L, "Product 1", "Description 1", 10.0,LocalDateTime.now(), LocalDateTime.now());
        Product updatedProduct = new Product(1L, "Updated Product 1", "Updated Description 1", 15.0,LocalDateTime.now(), LocalDateTime.now());

        Mockito.when(productService.findById(anyLong())).thenReturn(existingProduct);
        Mockito.when(productService.save(any(Product.class))).thenReturn(updatedProduct);

        mockMvc.perform(put("/api/products/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedProduct)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Updated Product 1"));
    }

    @Test
    public void deleteProductTest() throws Exception {
        Mockito.doNothing().when(productService).deleteById(anyLong());

        mockMvc.perform(delete("/api/products/1"))
                .andExpect(status().isOk());
    }
}
