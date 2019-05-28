package by.issoft.service.impl;

import by.issoft.service.ExpeditionService;
import by.issoft.domain.Expedition;
import by.issoft.repository.ExpeditionRepository;
import by.issoft.service.dto.ExpeditionDTO;
import by.issoft.service.mapper.ExpeditionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Expedition}.
 */
@Service
@Transactional
public class ExpeditionServiceImpl implements ExpeditionService {

    private final Logger log = LoggerFactory.getLogger(ExpeditionServiceImpl.class);

    private final ExpeditionRepository expeditionRepository;

    private final ExpeditionMapper expeditionMapper;

    public ExpeditionServiceImpl(ExpeditionRepository expeditionRepository, ExpeditionMapper expeditionMapper) {
        this.expeditionRepository = expeditionRepository;
        this.expeditionMapper = expeditionMapper;
    }

    /**
     * Save a expedition.
     *
     * @param expeditionDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ExpeditionDTO save(ExpeditionDTO expeditionDTO) {
        log.debug("Request to save Expedition : {}", expeditionDTO);
        Expedition expedition = expeditionMapper.toEntity(expeditionDTO);
        expedition = expeditionRepository.save(expedition);
        return expeditionMapper.toDto(expedition);
    }

    /**
     * Get all the expeditions.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<ExpeditionDTO> findAll() {
        log.debug("Request to get all Expeditions");
        return expeditionRepository.findAll().stream()
            .map(expeditionMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one expedition by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ExpeditionDTO> findOne(Long id) {
        log.debug("Request to get Expedition : {}", id);
        return expeditionRepository.findById(id)
            .map(expeditionMapper::toDto);
    }

    /**
     * Delete the expedition by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Expedition : {}", id);
        expeditionRepository.deleteById(id);
    }
}
