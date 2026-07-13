package com.muratech.cctv.controller;

import com.muratech.cctv.entity.BlogPostEntity;
import com.muratech.cctv.repository.BlogPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/blogs")
@CrossOrigin(origins = "*")
public class BlogPostController {

    @Autowired
    private BlogPostRepository blogPostRepository;

    @GetMapping
    public List<BlogPostEntity> getAllBlogs() {
        return blogPostRepository.findAll();
    }

    @PostMapping
    public BlogPostEntity addBlog(@RequestBody BlogPostEntity blog) {
        if (blog.getId() == null || blog.getId().trim().isEmpty()) {
            blog.setId("blog-" + UUID.randomUUID().toString().substring(0, 8));
        }
        return blogPostRepository.save(blog);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BlogPostEntity> updateBlog(@PathVariable String id, @RequestBody BlogPostEntity blogDetails) {
        return blogPostRepository.findById(id)
                .map(blog -> {
                    blog.setTitle(blogDetails.getTitle());
                    blog.setSummary(blogDetails.getSummary());
                    blog.setContent(blogDetails.getContent());
                    blog.setCategory(blogDetails.getCategory());
                    blog.setAuthor(blogDetails.getAuthor());
                    blog.setDate(blogDetails.getDate());
                    blog.setImage(blogDetails.getImage());
                    blog.setIsNews(blogDetails.getIsNews());
                    blog.setIsEvent(blogDetails.getIsEvent());
                    blog.setEventDate(blogDetails.getEventDate());
                    BlogPostEntity updated = blogPostRepository.save(blog);
                    return ResponseEntity.ok(updated);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlog(@PathVariable String id) {
        if (blogPostRepository.existsById(id)) {
            blogPostRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
