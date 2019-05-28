package by.issoft.service.impl;

import by.issoft.service.LanguageService;
import by.issoft.domain.Language;
import by.issoft.repository.LanguageRepository;
import by.issoft.service.dto.LanguageDTO;
import by.issoft.service.mapper.LanguageMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Language}.
 */
@Service
@Transactional
public class LanguageServiceImpl implements LanguageService {

    private final Logger log = LoggerFactory.getLogger(LanguageServiceImpl.class);

    private final LanguageRepository languageRepository;

    private final LanguageMapper languageMapper;

    public LanguageServiceImpl(LanguageRepository languageRepository, LanguageMapper languageMapper) {
        this.languageRepository = languageRepository;
        this.languageMapper = languageMapper;
    }

    /**
     * Save a language.
     *
     * @param languageDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public LanguageDTO save(LanguageDTO languageDTO) {
        log.debug("Request to save Language : {}", languageDTO);
        Language language = languageMapper.toEntity(languageDTO);
        language = languageRepository.save(language);
        return languageMapper.toDto(language);
    }

    /**
     * Get all the languages.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<LanguageDTO> findAll() {
        log.debug("Request to get all Languages");
        return languageRepository.findAllWithEagerRelationships().stream()
            .map(languageMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get all the languages with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<LanguageDTO> findAllWithEagerRelationships(Pageable pageable) {
        return languageRepository.findAllWithEagerRelationships(pageable).map(languageMapper::toDto);
    }
    

    /**
     * Get one language by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<LanguageDTO> findOne(Long id) {
        log.debug("Request to get Language : {}", id);
        return languageRepository.findOneWithEagerRelationships(id)
            .map(languageMapper::toDto);
    }

    /**
     * Delete the language by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Language : {}", id);
        languageRepository.deleteById(id);
    }
}
