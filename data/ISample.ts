export interface Sample {
    learning_materials: LearningMaterial[]
}

export interface LearningMaterial {
    id: string
    name: string
    description: string
    type: string
    learning_module_url: string
    sequence_number: number
    questions: Question[]
}

export interface Question {
    id: string
    content: string
    explanation: string
    indicator_name: string
    idJawabanUser: string;
    multiple_choices: MultipleChoice[]
}

export interface MultipleChoice {
    id: string
    content: string
    is_correct_answer: boolean
}
