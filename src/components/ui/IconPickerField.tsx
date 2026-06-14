import { useState, useMemo } from 'react';
import { Box, SimpleGrid, Flex, Tooltip, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import * as FiIcons from 'react-icons/fi';
import * as HiIcons from 'react-icons/hi';

interface IconPickerFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function IconPickerField({ value, onChange }: IconPickerFieldProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const allIcons = useMemo(() => {
    const fi = Object.keys(FiIcons)
      .filter(name => name.startsWith('Fi'))
      .map(name => ({
        value: name,
        label: name.replace('Fi', ''),
        library: 'fi'
      }));

    const hi = Object.keys(HiIcons)
      .filter(name => name.startsWith('Hi'))
      .map(name => ({
        value: name,
        label: name.replace('Hi', ''),
        library: 'hi'
      }));

    return [...fi, ...hi];
  }, []);

  const filteredOptions = useMemo(() => {
    if (!searchTerm) return allIcons;
    const lowerSearch = searchTerm.toLowerCase();
    return allIcons.filter(opt => 
      opt.label.toLowerCase().includes(lowerSearch) || 
      opt.value.toLowerCase().includes(lowerSearch)
    );
  }, [allIcons, searchTerm]);

  // Use pagination or virtualization if too many, but SimpleGrid handles a few hundreds fine.
  // For better performance, we cap the display if search is empty to avoid rendering 500+ DOM nodes at once.
  const displayedOptions = searchTerm ? filteredOptions : filteredOptions.slice(0, 150);

  return (
    <Box borderWidth="1px" borderRadius="10px" p={3} bg="gray.50">
      <InputGroup mb={3}>
        <InputLeftElement pointerEvents="none">
          <FiSearch color="var(--chakra-colors-gray-400)" />
        </InputLeftElement>
        <Input 
          placeholder="Rechercher parmi plus de 500 icônes..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          bg="white"
          borderRadius="md"
          _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)' }}
        />
      </InputGroup>

      <Box maxH="220px" overflowY="auto" pr={2} css={{
        '&::-webkit-scrollbar': { width: '4px' },
        '&::-webkit-scrollbar-track': { width: '6px' },
        '&::-webkit-scrollbar-thumb': { background: 'var(--chakra-colors-gray-300)', borderRadius: '24px' }
      }}>
        <SimpleGrid columns={{ base: 4, sm: 6, md: 8 }} spacing={2}>
          {displayedOptions.map((opt) => {
            // @ts-ignore
            const IconCmp = opt.library === 'fi' ? FiIcons[opt.value] : HiIcons[opt.value];
            if (!IconCmp) return null;
            
            const isSelected = value === opt.value;
            
            return (
              <Tooltip key={opt.value} label={`${opt.label} (${opt.library.toUpperCase()})`} placement="top">
                <Flex
                  as="button"
                  type="button"
                  onClick={() => onChange(opt.value)}
                  direction="column"
                  align="center"
                  justify="center"
                  p={2}
                  borderRadius="md"
                  borderWidth="2px"
                  borderColor={isSelected ? 'brand.500' : 'transparent'}
                  bg={isSelected ? 'brand.50' : 'white'}
                  _hover={{ bg: isSelected ? 'brand.100' : 'gray.100', borderColor: isSelected ? 'brand.500' : 'gray.200' }}
                  transition="all 0.2s"
                >
                  <IconCmp size={22} color={isSelected ? 'var(--chakra-colors-brand-500)' : 'var(--chakra-colors-gray-600)'} />
                </Flex>
              </Tooltip>
            );
          })}
        </SimpleGrid>
        
        {filteredOptions.length === 0 && (
          <Box p={4} textAlign="center" color="gray.500" fontSize="sm">
            Aucune icône trouvée pour "{searchTerm}".
          </Box>
        )}
        
        {!searchTerm && allIcons.length > 150 && (
          <Text fontSize="xs" color="gray.400" textAlign="center" mt={3}>
            Affiche 150 icônes sur {allIcons.length}. Utilisez la recherche pour en voir plus.
          </Text>
        )}
      </Box>
    </Box>
  );
}
