package by.issoft.web.rest;

import by.issoft.IslotrApp;
import by.issoft.domain.Expedition;
import by.issoft.repository.ExpeditionRepository;
import by.issoft.service.ExpeditionService;
import by.issoft.service.dto.ExpeditionDTO;
import by.issoft.service.mapper.ExpeditionMapper;
import by.issoft.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static by.issoft.web.rest.TestUtil.sameInstant;
import static by.issoft.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import by.issoft.domain.enumeration.Complexity;
/**
 * Integration tests for the {@Link ExpeditionResource} REST controller.
 */
@SpringBootTest(classes = IslotrApp.class)
public class ExpeditionResourceIT {

    private static final Complexity DEFAULT_COMPLEXITY = Complexity.EXTREME;
    private static final Complexity UPDATED_COMPLEXITY = Complexity.HARD;

    private static final ZonedDateTime DEFAULT_DISPATCH_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DISPATCH_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final LocalDate DEFAULT_DEAD_LINE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DEAD_LINE = LocalDate.now(ZoneId.systemDefault());

    private static final Double DEFAULT_RATE = 0D;
    private static final Double UPDATED_RATE = 1D;

    @Autowired
    private ExpeditionRepository expeditionRepository;

    @Autowired
    private ExpeditionMapper expeditionMapper;

    @Autowired
    private ExpeditionService expeditionService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restExpeditionMockMvc;

    private Expedition expedition;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ExpeditionResource expeditionResource = new ExpeditionResource(expeditionService);
        this.restExpeditionMockMvc = MockMvcBuilders.standaloneSetup(expeditionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Expedition createEntity(EntityManager em) {
        Expedition expedition = new Expedition()
            .complexity(DEFAULT_COMPLEXITY)
            .dispatchTime(DEFAULT_DISPATCH_TIME)
            .deadLine(DEFAULT_DEAD_LINE)
            .rate(DEFAULT_RATE);
        return expedition;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Expedition createUpdatedEntity(EntityManager em) {
        Expedition expedition = new Expedition()
            .complexity(UPDATED_COMPLEXITY)
            .dispatchTime(UPDATED_DISPATCH_TIME)
            .deadLine(UPDATED_DEAD_LINE)
            .rate(UPDATED_RATE);
        return expedition;
    }

    @BeforeEach
    public void initTest() {
        expedition = createEntity(em);
    }

    @Test
    @Transactional
    public void createExpedition() throws Exception {
        int databaseSizeBeforeCreate = expeditionRepository.findAll().size();

        // Create the Expedition
        ExpeditionDTO expeditionDTO = expeditionMapper.toDto(expedition);
        restExpeditionMockMvc.perform(post("/api/expeditions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expeditionDTO)))
            .andExpect(status().isCreated());

        // Validate the Expedition in the database
        List<Expedition> expeditionList = expeditionRepository.findAll();
        assertThat(expeditionList).hasSize(databaseSizeBeforeCreate + 1);
        Expedition testExpedition = expeditionList.get(expeditionList.size() - 1);
        assertThat(testExpedition.getComplexity()).isEqualTo(DEFAULT_COMPLEXITY);
        assertThat(testExpedition.getDispatchTime()).isEqualTo(DEFAULT_DISPATCH_TIME);
        assertThat(testExpedition.getDeadLine()).isEqualTo(DEFAULT_DEAD_LINE);
        assertThat(testExpedition.getRate()).isEqualTo(DEFAULT_RATE);
    }

    @Test
    @Transactional
    public void createExpeditionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = expeditionRepository.findAll().size();

        // Create the Expedition with an existing ID
        expedition.setId(1L);
        ExpeditionDTO expeditionDTO = expeditionMapper.toDto(expedition);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExpeditionMockMvc.perform(post("/api/expeditions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expeditionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Expedition in the database
        List<Expedition> expeditionList = expeditionRepository.findAll();
        assertThat(expeditionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllExpeditions() throws Exception {
        // Initialize the database
        expeditionRepository.saveAndFlush(expedition);

        // Get all the expeditionList
        restExpeditionMockMvc.perform(get("/api/expeditions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(expedition.getId().intValue())))
            .andExpect(jsonPath("$.[*].complexity").value(hasItem(DEFAULT_COMPLEXITY.toString())))
            .andExpect(jsonPath("$.[*].dispatchTime").value(hasItem(sameInstant(DEFAULT_DISPATCH_TIME))))
            .andExpect(jsonPath("$.[*].deadLine").value(hasItem(DEFAULT_DEAD_LINE.toString())))
            .andExpect(jsonPath("$.[*].rate").value(hasItem(DEFAULT_RATE.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getExpedition() throws Exception {
        // Initialize the database
        expeditionRepository.saveAndFlush(expedition);

        // Get the expedition
        restExpeditionMockMvc.perform(get("/api/expeditions/{id}", expedition.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(expedition.getId().intValue()))
            .andExpect(jsonPath("$.complexity").value(DEFAULT_COMPLEXITY.toString()))
            .andExpect(jsonPath("$.dispatchTime").value(sameInstant(DEFAULT_DISPATCH_TIME)))
            .andExpect(jsonPath("$.deadLine").value(DEFAULT_DEAD_LINE.toString()))
            .andExpect(jsonPath("$.rate").value(DEFAULT_RATE.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingExpedition() throws Exception {
        // Get the expedition
        restExpeditionMockMvc.perform(get("/api/expeditions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExpedition() throws Exception {
        // Initialize the database
        expeditionRepository.saveAndFlush(expedition);

        int databaseSizeBeforeUpdate = expeditionRepository.findAll().size();

        // Update the expedition
        Expedition updatedExpedition = expeditionRepository.findById(expedition.getId()).get();
        // Disconnect from session so that the updates on updatedExpedition are not directly saved in db
        em.detach(updatedExpedition);
        updatedExpedition
            .complexity(UPDATED_COMPLEXITY)
            .dispatchTime(UPDATED_DISPATCH_TIME)
            .deadLine(UPDATED_DEAD_LINE)
            .rate(UPDATED_RATE);
        ExpeditionDTO expeditionDTO = expeditionMapper.toDto(updatedExpedition);

        restExpeditionMockMvc.perform(put("/api/expeditions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expeditionDTO)))
            .andExpect(status().isOk());

        // Validate the Expedition in the database
        List<Expedition> expeditionList = expeditionRepository.findAll();
        assertThat(expeditionList).hasSize(databaseSizeBeforeUpdate);
        Expedition testExpedition = expeditionList.get(expeditionList.size() - 1);
        assertThat(testExpedition.getComplexity()).isEqualTo(UPDATED_COMPLEXITY);
        assertThat(testExpedition.getDispatchTime()).isEqualTo(UPDATED_DISPATCH_TIME);
        assertThat(testExpedition.getDeadLine()).isEqualTo(UPDATED_DEAD_LINE);
        assertThat(testExpedition.getRate()).isEqualTo(UPDATED_RATE);
    }

    @Test
    @Transactional
    public void updateNonExistingExpedition() throws Exception {
        int databaseSizeBeforeUpdate = expeditionRepository.findAll().size();

        // Create the Expedition
        ExpeditionDTO expeditionDTO = expeditionMapper.toDto(expedition);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExpeditionMockMvc.perform(put("/api/expeditions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expeditionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Expedition in the database
        List<Expedition> expeditionList = expeditionRepository.findAll();
        assertThat(expeditionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteExpedition() throws Exception {
        // Initialize the database
        expeditionRepository.saveAndFlush(expedition);

        int databaseSizeBeforeDelete = expeditionRepository.findAll().size();

        // Delete the expedition
        restExpeditionMockMvc.perform(delete("/api/expeditions/{id}", expedition.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Expedition> expeditionList = expeditionRepository.findAll();
        assertThat(expeditionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Expedition.class);
        Expedition expedition1 = new Expedition();
        expedition1.setId(1L);
        Expedition expedition2 = new Expedition();
        expedition2.setId(expedition1.getId());
        assertThat(expedition1).isEqualTo(expedition2);
        expedition2.setId(2L);
        assertThat(expedition1).isNotEqualTo(expedition2);
        expedition1.setId(null);
        assertThat(expedition1).isNotEqualTo(expedition2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ExpeditionDTO.class);
        ExpeditionDTO expeditionDTO1 = new ExpeditionDTO();
        expeditionDTO1.setId(1L);
        ExpeditionDTO expeditionDTO2 = new ExpeditionDTO();
        assertThat(expeditionDTO1).isNotEqualTo(expeditionDTO2);
        expeditionDTO2.setId(expeditionDTO1.getId());
        assertThat(expeditionDTO1).isEqualTo(expeditionDTO2);
        expeditionDTO2.setId(2L);
        assertThat(expeditionDTO1).isNotEqualTo(expeditionDTO2);
        expeditionDTO1.setId(null);
        assertThat(expeditionDTO1).isNotEqualTo(expeditionDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(expeditionMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(expeditionMapper.fromId(null)).isNull();
    }
}
