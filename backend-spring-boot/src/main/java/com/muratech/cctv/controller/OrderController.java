package com.muratech.cctv.controller;

import com.muratech.cctv.entity.OrderEntity;
import com.muratech.cctv.entity.OrderItemEntity;
import com.muratech.cctv.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping
    public List<OrderEntity> getAllOrders() {
        return orderRepository.findAll();
    }

    @PostMapping
    public OrderEntity placeOrder(@RequestBody OrderEntity order) {
        if (order.getId() == null || order.getId().trim().isEmpty()) {
            order.setId("ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }
        
        // Setup bidirectional relationship for JPA mapping cascade
        if (order.getItems() != null) {
            for (OrderItemEntity item : order.getItems()) {
                item.setOrder(order);
            }
        }
        
        return orderRepository.save(order);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<OrderEntity> updateOrderStatus(@PathVariable String id, @RequestParam String status) {
        return orderRepository.findById(id)
                .map(order -> {
                    order.setPaymentStatus(status);
                    OrderEntity updated = orderRepository.save(order);
                    return ResponseEntity.ok(updated);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable String id) {
        if (orderRepository.existsById(id)) {
            orderRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
