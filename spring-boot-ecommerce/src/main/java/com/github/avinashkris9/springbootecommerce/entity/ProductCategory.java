package com.github.avinashkris9.springbootecommerce.entity;

import com.github.avinashkris9.springbootecommerce.entity.Product;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="PRODUCT_CATEGORY")

@Data
public class ProductCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private long id;

    @Column(name ="category_name")
    private String categoryName;
    @OneToMany(cascade = CascadeType.ALL,mappedBy="category")
    private Set<Product> products;

}
