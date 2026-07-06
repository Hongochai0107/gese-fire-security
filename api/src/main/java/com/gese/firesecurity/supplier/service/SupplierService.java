package com.gese.firesecurity.supplier.service;

import com.gese.firesecurity.supplier.dto.CreateSupplierRequest;
import com.gese.firesecurity.supplier.dto.UpdateSupplierRequest;
import com.gese.firesecurity.supplier.entity.Supplier;
import com.gese.firesecurity.supplier.repository.SupplierRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SupplierService {

    private final SupplierRepository supplierRepo;

    public List<Supplier> findAll() {
        return supplierRepo.findAllByOrderByNameAsc();
    }

    public Supplier findOne(Long id) {
        return supplierRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Nhà cung cấp không tồn tại"));
    }

    public Supplier create(CreateSupplierRequest dto) {
        Supplier supplier = Supplier.builder()
                .name(dto.getName())
                .slug(dto.getSlug())
                .logo(dto.getLogo())
                .build();
        return supplierRepo.save(supplier);
    }

    public Supplier update(Long id, UpdateSupplierRequest dto) {
        Supplier supplier = findOne(id);
        if (dto.getName() != null) supplier.setName(dto.getName());
        if (dto.getSlug() != null) supplier.setSlug(dto.getSlug());
        if (dto.getLogo() != null) supplier.setLogo(dto.getLogo());
        return supplierRepo.save(supplier);
    }

    public void remove(Long id) {
        findOne(id);
        supplierRepo.deleteById(id);
    }
}
