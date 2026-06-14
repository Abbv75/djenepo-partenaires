
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  SimpleGrid,
  Box
} from '@chakra-ui/react';

export type FieldType = 'text' | 'textarea' | 'select' | 'date';

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  isRequired?: boolean;
  options?: { value: string | number; label: string }[];
  rows?: number; // for textarea
  colSpan?: number; // to span across columns
}

interface DynamicFormProps {
  fields: FormField[];
  formData: Record<string, any>;
  onChange: (name: string, value: any) => void;
  columns?: number;
}

export function DynamicForm({ fields, formData, onChange, columns = 1 }: DynamicFormProps) {
  return (
    <SimpleGrid columns={{ base: 1, md: columns }} spacing={4}>
      {fields.map((field) => (
        <Box key={field.name} gridColumn={{ md: field.colSpan ? `span ${field.colSpan}` : 'auto' }}>
          <FormControl isRequired={field.isRequired !== false}>
            <FormLabel fontWeight="600" color="gray.700">{field.label}</FormLabel>
            
            {field.type === 'text' && (
              <Input
                value={formData[field.name] || ''}
                onChange={(e) => onChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                borderRadius="10px"
                bg="white"
                _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)' }}
              />
            )}

            {field.type === 'date' && (
              <Input
                type="date"
                value={formData[field.name] || ''}
                onChange={(e) => onChange(field.name, e.target.value)}
                borderRadius="10px"
                bg="white"
                _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)' }}
              />
            )}
            
            {field.type === 'textarea' && (
              <Textarea
                value={formData[field.name] || ''}
                onChange={(e) => onChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                rows={field.rows || 3}
                borderRadius="10px"
                bg="white"
                _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)' }}
              />
            )}
            
            {field.type === 'select' && (
              <Select
                value={formData[field.name] || ''}
                onChange={(e) => onChange(field.name, e.target.value)}
                placeholder={field.placeholder || "Sélectionner..."}
                borderRadius="10px"
                bg="white"
                _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)' }}
              >
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Select>
            )}
          </FormControl>
        </Box>
      ))}
    </SimpleGrid>
  );
}
