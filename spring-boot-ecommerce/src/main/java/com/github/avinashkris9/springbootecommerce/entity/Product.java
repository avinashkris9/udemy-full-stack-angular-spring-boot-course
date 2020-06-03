package com.github.avinashkris9.springbootecommerce.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name="product")
@Data
public class Product {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String sku;
    private String name;
    private String description;
    @Column(name="unit_price")
    private BigDecimal unitPrice;

    @Column(name="image_url")
    private  String imageUrl;
    private boolean active;
    @Column(name="units_in_stock")
    private int unitsInStock;
    @CreationTimestamp
    @Column(name="date_created")
    private Date dateCreated;
    @UpdateTimestamp
    @Column(name="last_updated")
    private Date lastUpdated;


    @ManyToOne
    @JoinColumn(name="category_id", nullable=false)
    private ProductCategory category;

}
