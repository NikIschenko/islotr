package by.issoft.service;

import by.issoft.service.dto.LanguageDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link by.issoft.domain.Language}.
 */
public interface LanguageService {

    /**
     * Save a language.
     *
     * @param languageDTO the entity to save.
     * @return the persisted entity.
     */
    LanguageDTO save(LanguageDTO languageDTO);

    /**
     * Get all the languages.
     *
     * @return the list of entities.
     */
    List<LanguageDTO> findAll();

    /**
     * Get all the languages with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<LanguageDTO> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" language.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<LanguageDTO> findOne(Long id);

    /**
     * Delete the "id" language.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
