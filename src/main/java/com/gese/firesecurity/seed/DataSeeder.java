package com.gese.firesecurity.seed;

import com.gese.firesecurity.auth.entity.Role;
import com.gese.firesecurity.auth.entity.User;
import com.gese.firesecurity.auth.repository.UserRepository;
import com.gese.firesecurity.news.entity.ArticleStatus;
import com.gese.firesecurity.news.entity.Article;
import com.gese.firesecurity.news.entity.NewsCategory;
import com.gese.firesecurity.news.repository.ArticleRepository;
import com.gese.firesecurity.news.repository.NewsCategoryRepository;
import com.gese.firesecurity.product.entity.Category;
import com.gese.firesecurity.product.entity.Product;
import com.gese.firesecurity.product.entity.ProductStatus;
import com.gese.firesecurity.product.repository.CategoryRepository;
import com.gese.firesecurity.product.repository.ProductRepository;
import com.gese.firesecurity.supplier.entity.Supplier;
import com.gese.firesecurity.supplier.repository.SupplierRepository;
import com.gese.firesecurity.project.entity.Project;
import com.gese.firesecurity.project.entity.ProjectStatus;
import com.gese.firesecurity.project.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepo;
    private final CategoryRepository categoryRepo;
    private final ProductRepository productRepo;
    private final NewsCategoryRepository newsCatRepo;
    private final ArticleRepository articleRepo;
    private final ProjectRepository projectRepo;
    private final SupplierRepository supplierRepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        seedUsers();
        seedCategories();
        seedSuppliers();
        seedProducts();
        seedNewsCategories();
        seedArticles();
        seedProjects();
        log.info("Seed completed!");
    }

    private void seedUsers() {
        if (userRepo.findByEmail("admin@gesefiresecurity.vn").isPresent()) return;
        userRepo.saveAll(List.of(
            User.builder().email("admin@gesefiresecurity.vn").name("Super Admin")
                .password(passwordEncoder.encode("Admin@123")).role(Role.super_admin).build(),
            User.builder().email("editor@gesefiresecurity.vn").name("Editor")
                .password(passwordEncoder.encode("Editor@123")).role(Role.editor).build()
        ));
        log.info("Users seeded");
    }

    private void seedCategories() {
        if (categoryRepo.count() > 0) return;
        categoryRepo.saveAll(List.of(
            Category.builder().name("Đầu báo cháy").slug("dau-bao-chay").sortOrder(1).build(),
            Category.builder().name("Tủ trung tâm báo cháy").slug("tu-trung-tam-bao-chay").sortOrder(2).build(),
            Category.builder().name("Thiết bị chữa cháy").slug("thiet-bi-chua-chay").sortOrder(3).build(),
            Category.builder().name("Camera & An ninh").slug("camera-an-ninh").sortOrder(4).build(),
            Category.builder().name("Phụ kiện PCCC").slug("phu-kien-pccc").sortOrder(5).build()
        ));
        log.info("Categories seeded");
    }

    private void seedSuppliers() {
        if (supplierRepo.count() > 0) return;
        supplierRepo.saveAll(List.of(
            Supplier.builder().name("Hochiki").slug("hochiki").build(),
            Supplier.builder().name("Notifier").slug("notifier").build(),
            Supplier.builder().name("Bosch").slug("bosch").build(),
            Supplier.builder().name("Hikvision").slug("hikvision").build()
        ));
        log.info("Suppliers seeded");
    }

    private void seedProducts() {
        if (productRepo.count() > 0) return;
        var cats = categoryRepo.findAll();
        var suppliers = supplierRepo.findAll();
        productRepo.saveAll(List.of(
            Product.builder().name("Đầu báo khói quang điện GESE-SD01").slug("dau-bao-khoi-quang-dien-gese-sd01")
                .sku("GESE-SD01").shortDescription("Đầu báo khói quang điện thế hệ mới, độ nhạy cao, ổn định.")
                .specifications(Map.of("Nguồn", "24VDC", "Dòng", "< 30μA", "Nhiệt độ", "-10°C ~ 50°C", "Chuẩn", "EN 54-7"))
                .price(new BigDecimal("850000")).status(ProductStatus.active)
                .category(cats.isEmpty() ? null : cats.get(0))
                .supplier(suppliers.isEmpty() ? null : suppliers.get(0))
                .seoTitle("Đầu báo khói quang điện GESE-SD01 | GESE Fire & Security").build(),
            Product.builder().name("Đầu báo nhiệt cố định GESE-HD01").slug("dau-bao-nhiet-co-dinh-gese-hd01")
                .sku("GESE-HD01").shortDescription("Đầu báo nhiệt cố định 57°C, chống bụi, phù hợp nhà kho.")
                .specifications(Map.of("Ngưỡng", "57°C", "Nguồn", "24VDC", "IP", "IP42"))
                .price(new BigDecimal("650000")).status(ProductStatus.active)
                .category(cats.isEmpty() ? null : cats.get(0))
                .supplier(suppliers.size() > 1 ? suppliers.get(1) : null).build(),
            Product.builder().name("Tủ trung tâm báo cháy 4 zone GESE-FP04").slug("tu-trung-tam-bao-chay-4-zone-gese-fp04")
                .sku("GESE-FP04").shortDescription("Tủ trung tâm báo cháy 4 zone, màn hình LCD, hỗ trợ 128 địa chỉ.")
                .specifications(Map.of("Zone", "4", "Địa chỉ", "128", "Nguồn", "220VAC/24VDC"))
                .price(new BigDecimal("12500000")).status(ProductStatus.active)
                .category(cats.size() > 1 ? cats.get(1) : null)
                .supplier(suppliers.size() > 2 ? suppliers.get(2) : null).build()
        ));
        log.info("Products seeded");
    }

    private void seedNewsCategories() {
        if (newsCatRepo.count() > 0) return;
        newsCatRepo.saveAll(List.of(
            NewsCategory.builder().name("Kiến thức PCCC").slug("kien-thuc-pccc").sortOrder(1).build(),
            NewsCategory.builder().name("Quy định pháp luật").slug("quy-dinh-phap-luat").sortOrder(2).build(),
            NewsCategory.builder().name("Tin công ty").slug("tin-cong-ty").sortOrder(3).build()
        ));
        log.info("News categories seeded");
    }

    private void seedArticles() {
        if (articleRepo.count() > 0) return;
        var newsCats = newsCatRepo.findAll();
        var admin = userRepo.findByRole(Role.super_admin).orElse(null);
        articleRepo.saveAll(List.of(
            Article.builder().title("Hướng dẫn lắp đặt hệ thống báo cháy địa chỉ từ A-Z")
                .slug("huong-dan-lap-dat-he-thong-bao-chay-dia-chi")
                .excerpt("Tìm hiểu quy trình lắp đặt hệ thống báo cháy địa chỉ đúng chuẩn TCVN.")
                .content("<h2>Bước 1: Khảo sát</h2><p>Kỹ sư khảo sát thực tế...</p>")
                .status(ArticleStatus.published).publishedAt(LocalDateTime.now())
                .category(newsCats.isEmpty() ? null : newsCats.get(0))
                .author(admin).build(),
            Article.builder().title("QCVN 06:2022/BXD — Những thay đổi quan trọng")
                .slug("qcvn-06-2022-bxd-thay-doi-quan-trong")
                .excerpt("Tổng hợp điểm mới trong quy chuẩn QCVN 06:2022/BXD.")
                .content("<p>Quy chuẩn kỹ thuật quốc gia QCVN 06:2022/BXD...</p>")
                .status(ArticleStatus.published).publishedAt(LocalDateTime.now())
                .category(newsCats.size() > 1 ? newsCats.get(1) : null)
                .author(admin).build()
        ));
        log.info("Articles seeded");
    }

    private void seedProjects() {
        if (projectRepo.count() > 0) return;
        projectRepo.saveAll(List.of(
            Project.builder().title("Hệ thống PCCC nhà máy sản xuất linh kiện điện tử")
                .slug("he-thong-pccc-nha-may-linh-kien-dien-tu")
                .client("Công ty TNHH Điện tử ABC Việt Nam").location("KCN Yên Phong, Bắc Ninh")
                .description("Thiết kế & thi công hệ thống báo cháy địa chỉ và chữa cháy Sprinkler cho nhà xưởng 45.000 m².")
                .scope(List.of("Thiết kế hệ thống", "Thi công lắp đặt", "Nghiệm thu PCCC"))
                .completedAt(LocalDate.of(2023, 9, 1)).status(ProjectStatus.active).build(),
            Project.builder().title("Giải pháp PCCC & an ninh Riverside Plaza")
                .slug("giai-phap-pccc-an-ninh-riverside-plaza")
                .client("Riverside Plaza Investment").location("Quận 1, TP. Hồ Chí Minh")
                .description("Tích hợp hệ thống chữa cháy, báo cháy và camera giám sát cho TTTM 6 tầng.")
                .scope(List.of("Hệ thống chữa cháy", "Hệ thống báo cháy", "Camera giám sát"))
                .completedAt(LocalDate.of(2022, 8, 1)).status(ProjectStatus.active).build()
        ));
        log.info("Projects seeded");
    }
}
