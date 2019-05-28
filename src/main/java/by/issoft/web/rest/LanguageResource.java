package by.issoft.web.rest;

import by.issoft.service.LanguageService;
import by.issoft.web.rest.errors.BadRequestAlertException;
import by.issoft.service.dto.LanguageDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link by.issoft.domain.Language}.
 */
@RestController
@RequestMapping("/api")
public class LanguageResource {

    private final Logger log = LoggerFactory.getLogger(LanguageResource.class);

    private static final String ENTITY_NAME = "language";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LanguageService languageService;

    public LanguageResource(LanguageService languageService) {
        this.languageService = languageService;
    }

    /**
     * {@code POST  /languages} : Create a new language.
     *
     * @param languageDTO the languageDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new languageDTO, or with status {@code 400 (Bad Request)} if the language has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/languages")
    public ResponseEntity<LanguageDTO> createLanguage(@Valid @RequestBody LanguageDTO languageDTO) throws URISyntaxException {
        log.debug("REST request to save Language : {}", languageDTO);
        if (languageDTO.getId() != null) {
            throw new BadRequestAlertException("A new language cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LanguageDTO result = languageService.save(languageDTO);
        return ResponseEntity.created(new URI("/api/languages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /languages} : Updates an existing language.
     *
     * @param languageDTO the languageDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated languageDTO,
     * or with status {@code 400 (Bad Request)} if the languageDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the languageDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/languages")
    public ResponseEntity<LanguageDTO> updateLanguage(@Valid @RequestBody LanguageDTO languageDTO) throws URISyntaxException {
        log.debug("REST request to update Language : {}", languageDTO);
        if (languageDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LanguageDTO result = languageService.save(languageDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, languageDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /languages} : get all the languages.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of languages in body.
     */
    @GetMapping("/languages")
    public List<LanguageDTO> getAllLanguages(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Languages");
        return languageService.findAll();
    }

    /**
     * {@code GET  /languages/:id} : get the "id" language.
     *
     * @param id the id of the languageDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the languageDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/languages/{id}")
    public ResponseEntity<LanguageDTO> getLanguage(@PathVariable Long id) {
        log.debug("REST request to get Language : {}", id);
        Optional<LanguageDTO> languageDTO = languageService.findOne(id);
        return ResponseUtil.wrapOrNotFound(languageDTO);
    }

    /**
     * {@code DELETE  /languages/:id} : delete the "id" language.
     *
     * @param id the id of the languageDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/languages/{id}")
    public ResponseEntity<Void> deleteLanguage(@PathVariable Long id) {
        log.debug("REST request to delete Language : {}", id);
        languageService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
