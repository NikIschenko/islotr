package by.issoft.web.rest;

import by.issoft.service.ExpeditionService;
import by.issoft.web.rest.errors.BadRequestAlertException;
import by.issoft.service.dto.ExpeditionDTO;

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
 * REST controller for managing {@link by.issoft.domain.Expedition}.
 */
@RestController
@RequestMapping("/api")
public class ExpeditionResource {

    private final Logger log = LoggerFactory.getLogger(ExpeditionResource.class);

    private static final String ENTITY_NAME = "expedition";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ExpeditionService expeditionService;

    public ExpeditionResource(ExpeditionService expeditionService) {
        this.expeditionService = expeditionService;
    }

    /**
     * {@code POST  /expeditions} : Create a new expedition.
     *
     * @param expeditionDTO the expeditionDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new expeditionDTO, or with status {@code 400 (Bad Request)} if the expedition has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/expeditions")
    public ResponseEntity<ExpeditionDTO> createExpedition(@Valid @RequestBody ExpeditionDTO expeditionDTO) throws URISyntaxException {
        log.debug("REST request to save Expedition : {}", expeditionDTO);
        if (expeditionDTO.getId() != null) {
            throw new BadRequestAlertException("A new expedition cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ExpeditionDTO result = expeditionService.save(expeditionDTO);
        return ResponseEntity.created(new URI("/api/expeditions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /expeditions} : Updates an existing expedition.
     *
     * @param expeditionDTO the expeditionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated expeditionDTO,
     * or with status {@code 400 (Bad Request)} if the expeditionDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the expeditionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/expeditions")
    public ResponseEntity<ExpeditionDTO> updateExpedition(@Valid @RequestBody ExpeditionDTO expeditionDTO) throws URISyntaxException {
        log.debug("REST request to update Expedition : {}", expeditionDTO);
        if (expeditionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ExpeditionDTO result = expeditionService.save(expeditionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, expeditionDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /expeditions} : get all the expeditions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of expeditions in body.
     */
    @GetMapping("/expeditions")
    public List<ExpeditionDTO> getAllExpeditions() {
        log.debug("REST request to get all Expeditions");
        return expeditionService.findAll();
    }

    /**
     * {@code GET  /expeditions/:id} : get the "id" expedition.
     *
     * @param id the id of the expeditionDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the expeditionDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/expeditions/{id}")
    public ResponseEntity<ExpeditionDTO> getExpedition(@PathVariable Long id) {
        log.debug("REST request to get Expedition : {}", id);
        Optional<ExpeditionDTO> expeditionDTO = expeditionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(expeditionDTO);
    }

    /**
     * {@code DELETE  /expeditions/:id} : delete the "id" expedition.
     *
     * @param id the id of the expeditionDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/expeditions/{id}")
    public ResponseEntity<Void> deleteExpedition(@PathVariable Long id) {
        log.debug("REST request to delete Expedition : {}", id);
        expeditionService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
