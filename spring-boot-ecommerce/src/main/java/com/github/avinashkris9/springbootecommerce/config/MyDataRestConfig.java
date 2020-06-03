package com.github.avinashkris9.springbootecommerce.config;

import com.github.avinashkris9.springbootecommerce.entity.Product;
import com.github.avinashkris9.springbootecommerce.entity.ProductCategory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import javax.persistence.EntityManager;
import java.util.stream.Collectors;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

  private EntityManager entityManager;

  public MyDataRestConfig(EntityManager entityManager) {
    this.entityManager = entityManager;
  }

  @Override
  public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {

    HttpMethod[] unSupported = {
      HttpMethod.DELETE, HttpMethod.POST, HttpMethod.PUT, HttpMethod.PATCH
    };

    // disable
    config
        .getExposureConfiguration()
        .forDomainType(Product.class)
        .withItemExposure((metdata, httpMethods) -> httpMethods.disable(unSupported))
        .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(unSupported));

    config
        .getExposureConfiguration()
        .forDomainType(ProductCategory.class)
        .withItemExposure((metdata, httpMethods) -> httpMethods.disable(unSupported))
        .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(unSupported));
    exposeEntityIds(config);
    ;
  }

  /*

  This helper function is to expose the primary key ids in json rest api
   */
  public void exposeEntityIds(RepositoryRestConfiguration config) {
    Class[] domainTypes =
        entityManager.getMetamodel().getEntities().stream()
            .map(e -> e.getJavaType())
            .collect(Collectors.toList())
            .toArray(new Class[0]);

    config.exposeIdsFor(domainTypes);
  }
}
