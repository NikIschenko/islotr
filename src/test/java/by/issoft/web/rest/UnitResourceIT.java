package by.issoft.web.rest;

import by.issoft.IslotrApp;
import by.issoft.domain.Unit;
import by.issoft.repository.UnitRepository;
import by.issoft.service.UnitService;
import by.issoft.service.dto.UnitDTO;
import by.issoft.service.mapper.UnitMapper;
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
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static by.issoft.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link UnitResource} REST controller.
 */
@SpringBootTest(classes = IslotrApp.class)
public class UnitResourceIT {

    private static final LocalDate DEFAULT_HIRE_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_HIRE_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_BIOGRAPHY = "AAAAAAAAAA";
    private static final String UPDATED_BIOGRAPHY = "BBBBBBBBBB";

    private static final Integer DEFAULT_NUMBER_OF_TEETH = 0;
    private static final Integer UPDATED_NUMBER_OF_TEETH = 1;

    @Autowired
    private UnitRepository unitRepository;

    @Autowired
    private UnitMapper unitMapper;

    @Autowired
    private UnitService unitService;

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

    private MockMvc restUnitMockMvc;

    private Unit unit;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UnitResource unitResource = new UnitResource(unitService);
        this.restUnitMockMvc = MockMvcBuilders.standaloneSetup(unitResource)
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
    public static Unit createEntity(EntityManager em) {
        Unit unit = new Unit()
            .hireDate(DEFAULT_HIRE_DATE)
            .biography(DEFAULT_BIOGRAPHY)
            .numberOfTeeth(DEFAULT_NUMBER_OF_TEETH);
        return unit;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Unit createUpdatedEntity(EntityManager em) {
        Unit unit = new Unit()
            .hireDate(UPDATED_HIRE_DATE)
            .biography(UPDATED_BIOGRAPHY)
            .numberOfTeeth(UPDATED_NUMBER_OF_TEETH);
        return unit;
    }

    @BeforeEach
    public void initTest() {
        unit = createEntity(em);
    }

    @Test
    @Transactional
    public void createUnit() throws Exception {
        int databaseSizeBeforeCreate = unitRepository.findAll().size();

        // Create the Unit
        UnitDTO unitDTO = unitMapper.toDto(unit);
        restUnitMockMvc.perform(post("/api/units")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(unitDTO)))
            .andExpect(status().isCreated());

        // Validate the Unit in the database
        List<Unit> unitList = unitRepository.findAll();
        assertThat(unitList).hasSize(databaseSizeBeforeCreate + 1);
        Unit testUnit = unitList.get(unitList.size() - 1);
        assertThat(testUnit.getHireDate()).isEqualTo(DEFAULT_HIRE_DATE);
        assertThat(testUnit.getBiography()).isEqualTo(DEFAULT_BIOGRAPHY);
        assertThat(testUnit.getNumberOfTeeth()).isEqualTo(DEFAULT_NUMBER_OF_TEETH);
    }

    @Test
    @Transactional
    public void createUnitWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = unitRepository.findAll().size();

        // Create the Unit with an existing ID
        unit.setId(1L);
        UnitDTO unitDTO = unitMapper.toDto(unit);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUnitMockMvc.perform(post("/api/units")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(unitDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Unit in the database
        List<Unit> unitList = unitRepository.findAll();
        assertThat(unitList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllUnits() throws Exception {
        // Initialize the database
        unitRepository.saveAndFlush(unit);

        // Get all the unitList
        restUnitMockMvc.perform(get("/api/units?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(unit.getId().intValue())))
            .andExpect(jsonPath("$.[*].hireDate").value(hasItem(DEFAULT_HIRE_DATE.toString())))
            .andExpect(jsonPath("$.[*].biography").value(hasItem(DEFAULT_BIOGRAPHY.toString())))
            .andExpect(jsonPath("$.[*].numberOfTeeth").value(hasItem(DEFAULT_NUMBER_OF_TEETH)));
    }
    
    @Test
    @Transactional
    public void getUnit() throws Exception {
        // Initialize the database
        unitRepository.saveAndFlush(unit);

        // Get the unit
        restUnitMockMvc.perform(get("/api/units/{id}", unit.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(unit.getId().intValue()))
            .andExpect(jsonPath("$.hireDate").value(DEFAULT_HIRE_DATE.toString()))
            .andExpect(jsonPath("$.biography").value(DEFAULT_BIOGRAPHY.toString()))
            .andExpect(jsonPath("$.numberOfTeeth").value(DEFAULT_NUMBER_OF_TEETH));
    }

    @Test
    @Transactional
    public void getNonExistingUnit() throws Exception {
        // Get the unit
        restUnitMockMvc.perform(get("/api/units/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUnit() throws Exception {
        // Initialize the database
        unitRepository.saveAndFlush(unit);

        int databaseSizeBeforeUpdate = unitRepository.findAll().size();

        // Update the unit
        Unit updatedUnit = unitRepository.findById(unit.getId()).get();
        // Disconnect from session so that the updates on updatedUnit are not directly saved in db
        em.detach(updatedUnit);
        updatedUnit
            .hireDate(UPDATED_HIRE_DATE)
            .biography(UPDATED_BIOGRAPHY)
            .numberOfTeeth(UPDATED_NUMBER_OF_TEETH);
        UnitDTO unitDTO = unitMapper.toDto(updatedUnit);

        restUnitMockMvc.perform(put("/api/units")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(unitDTO)))
            .andExpect(status().isOk());

        // Validate the Unit in the database
        List<Unit> unitList = unitRepository.findAll();
        assertThat(unitList).hasSize(databaseSizeBeforeUpdate);
        Unit testUnit = unitList.get(unitList.size() - 1);
        assertThat(testUnit.getHireDate()).isEqualTo(UPDATED_HIRE_DATE);
        assertThat(testUnit.getBiography()).isEqualTo(UPDATED_BIOGRAPHY);
        assertThat(testUnit.getNumberOfTeeth()).isEqualTo(UPDATED_NUMBER_OF_TEETH);
    }

    @Test
    @Transactional
    public void updateNonExistingUnit() throws Exception {
        int databaseSizeBeforeUpdate = unitRepository.findAll().size();

        // Create the Unit
        UnitDTO unitDTO = unitMapper.toDto(unit);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUnitMockMvc.perform(put("/api/units")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(unitDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Unit in the database
        List<Unit> unitList = unitRepository.findAll();
        assertThat(unitList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUnit() throws Exception {
        // Initialize the database
        unitRepository.saveAndFlush(unit);

        int databaseSizeBeforeDelete = unitRepository.findAll().size();

        // Delete the unit
        restUnitMockMvc.perform(delete("/api/units/{id}", unit.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Unit> unitList = unitRepository.findAll();
        assertThat(unitList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Unit.class);
        Unit unit1 = new Unit();
        unit1.setId(1L);
        Unit unit2 = new Unit();
        unit2.setId(unit1.getId());
        assertThat(unit1).isEqualTo(unit2);
        unit2.setId(2L);
        assertThat(unit1).isNotEqualTo(unit2);
        unit1.setId(null);
        assertThat(unit1).isNotEqualTo(unit2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(UnitDTO.class);
        UnitDTO unitDTO1 = new UnitDTO();
        unitDTO1.setId(1L);
        UnitDTO unitDTO2 = new UnitDTO();
        assertThat(unitDTO1).isNotEqualTo(unitDTO2);
        unitDTO2.setId(unitDTO1.getId());
        assertThat(unitDTO1).isEqualTo(unitDTO2);
        unitDTO2.setId(2L);
        assertThat(unitDTO1).isNotEqualTo(unitDTO2);
        unitDTO1.setId(null);
        assertThat(unitDTO1).isNotEqualTo(unitDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(unitMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(unitMapper.fromId(null)).isNull();
    }
}
