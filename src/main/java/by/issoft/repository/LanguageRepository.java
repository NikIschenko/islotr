package by.issoft.repository;

import by.issoft.domain.Language;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Language entity.
 */
@Repository
public interface LanguageRepository extends JpaRepository<Language, Long> {

    @Query(value = "select distinct language from Language language left join fetch language.units",
        countQuery = "select count(distinct language) from Language language")
    Page<Language> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct language from Language language left join fetch language.units")
    List<Language> findAllWithEagerRelationships();

    @Query("select language from Language language left join fetch language.units where language.id =:id")
    Optional<Language> findOneWithEagerRelationships(@Param("id") Long id);

}
