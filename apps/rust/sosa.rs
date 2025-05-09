use std::collections::HashMap;

use std::fmt;

#[derive(Debug)]

struct TypeMain {

    sosa: TypeSosa,

    gene: TypeGene,

    line: TypeLine,

}

#[derive(Debug)]

struct TypeSosa {

    ego: TypeSexNorRev,

    dad: TypeSexNorRev,

    mom: TypeSexNorRev,

    kid: TypeSexNorRev,

}

#[derive(Debug)]

struct TypeGene {

    tier: TypeDecBin,

    sosa: TypeMinMax,

    sort: [TypeNorRev; 2],

}

#[derive(Debug)]

struct TypeLine {

    dad: TypeLineInner,

    mom: TypeLineInner,

}

#[derive(Debug)]

struct TypeLineInner {

    gene: TypeDecBin,

    tier: TypeDecBin,

    name: TypeDecBin,

    sort: TypeDecBin,

}

#[derive(Debug)]

struct TypeSexNorRev {

    sex: String,

    nor: TypeDecBin,

    rev: TypeDecBin,

}

#[derive(Debug)]

struct TypeNorRev {

    nor: TypeDecBin,

    rev: TypeDecBin,

}

#[derive(Debug)]

struct TypeDecBin {

    dec: u32,

    bin: String,

}

#[derive(Debug)]

struct TypeMinMax {

    min: TypeDecBin,

    max: TypeDecBin,

}

#[derive(Debug)]

enum TypeGender {

    MaleOrFemale,

    Male,

    Female,

    MaleAndFemale,

}

fn create_id_info_for_person(sosa: u32) -> TypeMain {

    let sosa_ego_gender = if sosa < 2 { TypeGender::MaleOrFemale } else if sosa % 2 == 0 { TypeGender::Male } else { TypeGender::Female };

    let sosa_ego_normal = base2_and_base10(sosa);

    let gene_tier       = base2_and_base10((sosa as f64).log2().floor() as u32 + 1);

    let gene_sosa_min   = base2_and_base10((2_u32.pow((sosa as f64).log2().floor() as u32)) as u32);

    let gene_sosa_max   = base2_and_base10((2_u32.pow((sosa as f64).log2().floor() as u32 + 1) - 1) as u32);

    let sort_normal_1   = base2_and_base10(sosa + 1 - gene_sosa_min.dec);

    let sort_normal_0   = base2_and_base10(sort_normal_1.dec - 1);

    let sort_revers_1   = base2_and_base10(gene_sosa_max.dec + 1 - sosa);

    let sort_revers_0   = base2_and_base10(sort_revers_1.dec - 1);

    let sosa_ego_revers = base2_and_base10(gene_sosa_max.dec - sort_normal_0.dec);

    let line_dad_sort   = base2_and_base10(if sort_normal_1.dec == 1 { gene_tier.dec } else { base2_end_zeros_count(&sort_normal_0.bin) + 1 });

    let line_mom_sort   = base2_and_base10(if sort_revers_1.dec == 1 { gene_tier.dec } else { base2_end_zeros_count(&sort_revers_0.bin) + 1 });

    let line_dad_tier   = base2_and_base10(base2_end_zeros_clear(&sosa_ego_normal.bin));

    let line_mom_tier   = base2_and_base10(base2_end_zeros_clear(&sosa_ego_revers.bin));

    let line_dad_name   = base2_and_base10(line_dad_tier.dec + 1);

    let line_mom_name   = base2_and_base10(line_mom_tier.dec + 2);

    let line_dad_gene   = base2_and_base10(line_dad_tier.bin.len() as u32);

    let line_mom_gene   = base2_and_base10(line_mom_tier.bin.len() as u32);

    let sosa_dad_gender = TypeGender::Male;

    let sosa_dad_normal = base2_and_base10(sosa_ego_normal.dec * 2);

    let sosa_dad_revers = base2_and_base10(sosa_ego_revers.dec * 2 + 1);

    let sosa_mom_gender = TypeGender::Female;

    let sosa_mom_normal = base2_and_base10(sosa_ego_normal.dec * 2 + 1);

    let sosa_mom_revers = base2_and_base10(sosa_ego_revers.dec * 2);

    let sosa_kid_gender = if sosa / 2 < 2 { TypeGender::MaleOrFemale } else if sosa / 2 % 2 == 0 { TypeGender::Male } else { TypeGender::Female };

    let sosa_kid_normal = base2_and_base10((sosa_ego_normal.dec / 2) as u32);

    let sosa_kid_revers = base2_and_base10((sosa_ego_revers.dec / 2) as u32);

    fn base2_and_base10(a: u32) -> TypeDecBin {

        TypeDecBin {

            dec: a,

            bin: format!("{:b}", a),

        }

    }

    fn base2_end_zeros_count(a: &str) -> u32 {

        let mut r = 0;

        let mut t = true;

        let e: Vec<char> = a.chars().collect();

        let mut l = e.len();

        while l > 0 && t {

            if e[l - 1] == '0' {

                r += 1;

            } else {

                t = false;

            }

            l -= 1;

        }

        r

    }

    fn base2_end_zeros_clear(a: &str) -> u32 {

        let c = a.trim_end_matches('0');

        let r = u32::from_str_radix(c, 2).unwrap();

        r

    }

    fn sex_char(x: TypeGender) -> String{

        match x{

            TypeGender::MaleOrFemale => String::from("⚥"),

            TypeGender::Male => String::from("♂"),

            TypeGender::Female => String::from("♀"),

            TypeGender::MaleAndFemale => String::from("⚤")

        }

    }

    TypeMain {

        sosa: TypeSosa {

            ego: TypeSexNorRev {

                sex: sex_char(sosa_ego_gender),

                nor: sosa_ego_normal,

                rev: sosa_ego_revers,

            },

            dad: TypeSexNorRev {

                sex: sex_char(sosa_dad_gender),

                nor: sosa_dad_normal,

                rev: sosa_dad_revers,

            },

            mom: TypeSexNorRev {

                sex: sex_char(sosa_mom_gender),

                nor: sosa_mom_normal,

                rev: sosa_mom_revers,

            },

            kid: TypeSexNorRev {

                sex: sex_char(sosa_kid_gender),

                nor: sosa_kid_normal,

                rev: sosa_kid_revers,

            },

        },

        gene: TypeGene {

            tier: gene_tier,

            sosa: TypeMinMax {

                min: gene_sosa_min,

                max: gene_sosa_max,

            },

            sort: [

                TypeNorRev {

                    nor: sort_normal_0,

                    rev: sort_revers_0,

                },

                TypeNorRev {

                    nor: sort_normal_1,

                    rev: sort_revers_1,

                },

            ],

        },

        line: TypeLine {

            dad: TypeLineInner {

                gene: line_dad_gene,

                tier: line_dad_tier,

                name: line_dad_name,

                sort: line_dad_sort,

            },

            mom: TypeLineInner {

                gene: line_mom_gene,

                tier: line_mom_tier,

                name: line_mom_name,

                sort: line_mom_sort,

            },

        },

    }

}

struct SosaPlusDb {

    id_db: HashMap<u32, TypeMain>,

}

impl SosaPlusDb {

    fn new() -> Self {

        SosaPlusDb {

            id_db: HashMap::new(),

        }

    }  

    fn set_from_given_sosa(&mut self, sosa: u32) {

        if sosa > 0 {

            self.id_db.insert(sosa, create_id_info_for_person(sosa));

        }

    }

    fn set_from_array_sosa(&mut self, sosa_arr: &[u32]) {

        for &sosa in sosa_arr {

            if sosa > 0 {

                self.id_db.insert(sosa, create_id_info_for_person(sosa));

            }

        }

    }

    fn set_from_range_sosa(&mut self, sosa_first: u32, sosa_last: u32) {

        for sosa in sosa_first..=sosa_last {

            if sosa > 0 {

                self.id_db.insert(sosa, create_id_info_for_person(sosa));

            }

        }

    }

    fn get_data(&self) -> &HashMap<u32, TypeMain> {

        &self.id_db

    }

    fn get_out_full_as_csv(&self) {

        let mut csv = String::new();

        csv.push_str(

            "\"Gene.Tier.Dec\", \"Gene.Tier.Bin\", \"Gene.Sosa.Min.Dec\", \"Gene.Sosa.Min.Bin\", \"Gene.Sosa.Max.Dec\", \"Gene.Sosa.Max.Bin\", \"Gene.Sort.0.Nor.Dec\", \"Gene.Sort.0.Nor.Bin\", \"Gene.Sort.0.Rev.Dec\", \"Gene.Sort.0.Rev.Bin\", \"Gene.Sort.1.Nor.Dec\", \"Gene.Sort.1.Nor.Bin\", \"Gene.Sort.1.Rev.Dec\", \"Gene.Sort.1.Rev.Bin\", \"Sosa.Ego.Sex\", \"Sosa.Ego.Nor.Dec\", \"Sosa.Ego.Nor.Bin\", \"Sosa.Ego.Rev.Dec\", \"Sosa.Ego.Rev.Bin\", \"Sosa.Dad.Sex\", \"Sosa.Dad.Nor.Dec\", \"Sosa.Dad.Nor.Bin\", \"Sosa.Dad.Rev.Dec\", \"Sosa.Dad.Rev.Bin\", \"Sosa.Mom.Sex\", \"Sosa.Mom.Nor.Dec\", \"Sosa.Mom.Nor.Bin\", \"Sosa.Mom.Rev.Dec\", \"Sosa.Mom.Rev.Bin\", \"Sosa.Kid.Sex\", \"Sosa.Kid.Nor.Dec\", \"Sosa.Kid.Nor.Bin\", \"Sosa.Kid.Rev.Dec\", \"Sosa.Kid.Rev.Bin\", \"Line.Dad.Gene.Dec\", \"Line.Dad.Gene.Bin\", \"Line.Dad.Tier.Dec\", \"Line.Dad.Tier.Bin\", \"Line.Dad.Name.Dec\", \"Line.Dad.Name.Bin\", \"Line.Dad.Sort.Dec\", \"Line.Dad.Sort.Bin\", \"Line.Mom.Gene.Dec\", \"Line.Mom.Gene.Bin\", \"Line.Mom.Tier.Dec\", \"Line.Mom.Tier.Bin\", \"Line.Mom.Name.Dec\", \"Line.Mom.Name.Bin\", \"Line.Mom.Sort.Dec\", \"Line.Mom.Sort.Bin\"\n",

        );

        for (_, person) in &self.id_db {

            csv.push_str(&format!(

                "\"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\"\n",

                person.gene.tier.dec, person.gene.tier.bin, person.gene.sosa.min.dec, person.gene.sosa.min.bin, person.gene.sosa.max.dec, person.gene.sosa.max.bin, person.gene.sort[0].nor.dec, person.gene.sort[0].nor.bin, person.gene.sort[0].rev.dec, person.gene.sort[0].rev.bin, person.gene.sort[1].nor.dec, person.gene.sort[1].nor.bin, person.gene.sort[1].rev.dec, person.gene.sort[1].rev.bin, person.sosa.ego.sex, person.sosa.ego.nor.dec, person.sosa.ego.nor.bin, person.sosa.ego.rev.dec, person.sosa.ego.rev.bin, person.sosa.dad.sex, person.sosa.dad.nor.dec, person.sosa.dad.nor.bin, person.sosa.dad.rev.dec, person.sosa.dad.rev.bin, person.sosa.mom.sex, person.sosa.mom.nor.dec, person.sosa.mom.nor.bin, person.sosa.mom.rev.dec, person.sosa.mom.rev.bin, person.sosa.kid.sex, person.sosa.kid.nor.dec, person.sosa.kid.nor.bin, person.sosa.kid.rev.dec, person.sosa.kid.rev.bin, person.line.dad.gene.dec, person.line.dad.gene.bin, person.line.dad.tier.dec, person.line.dad.tier.bin, person.line.dad.name.dec, person.line.dad.name.bin, person.line.dad.sort.dec, person.line.dad.sort.bin, person.line.mom.gene.dec, person.line.mom.gene.bin, person.line.mom.tier.dec, person.line.mom.tier.bin, person.line.mom.name.dec, person.line.mom.name.bin, person.line.mom.sort.dec, person.line.mom.sort.bin,

            ));

        }

        println!("{}", csv);

    }

    fn get_out_tiny(&self) {

        println!(" ");

        println!("              ╔{}╗   ", "═".repeat(34));

        println!("              ║     INFO WITH FORMAT TINY     ║");

        println!("╔══════════╦═══╩═══╦════════════╦════════════╦════╩══════╦═══════════╦═══════════╗");

        println!("║ SEX+GEN ║ SOSA  ║  LINE-Y   ║  LINE-X   ║ SOSA-DAD ║ SOSA-MOM ║ SOSA-KID ║");

        for (key, value) in &self.id_db {

            println!("║  {}  {} ║  {} ║ {} — {} ║ {} — {} ║   {}   ║   {}   ║   {}   ║", value.sosa.ego.sex, format!("{:<3}", value.gene.tier.dec), format!("{:<4}", value.sosa.ego.nor.dec), format!("{:<4}", value.line.dad.name.dec), format!("{:<2}", value.line.dad.sort.dec), format!("{:<4}", value.line.mom.name.dec), format!("{:<2}", value.line.mom.sort.dec), format!("{:<4}", value.sosa.dad.nor.dec), format!("{:<4}", value.sosa.mom.nor.dec), format!("{:<4}", value.sosa.kid.nor.dec));

        }

        println!("╚{}╩{}╩{}╩{}╩{}╩{}╩{}╝", "═".repeat(10), "═".repeat(7), "═".repeat(12), "═".repeat(12), "═".repeat(11), "═".repeat(11), "═".repeat(11));

    }

}

// ======example usage =====

fn main() {

    let mut aaa = SosaPlusDb::new();

    aaa.set_from_given_sosa(44);

    aaa.set_from_array_sosa(&[1, 4, 7]);

    aaa.set_from_range_sosa(23, 26);

    aaa.get_out_full_as_csv();

    aaa.get_out_tiny();    

}

// ======example usage =====
